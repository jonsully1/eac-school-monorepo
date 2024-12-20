import { GenerateTokenError } from "../errors/GenerateTokenError";
import { MagicLinkInvalidError } from "../errors/MagicLinkInvalidError";
import { SendMagicLinkError } from "../errors/SendMagicLinkError";
import { UserInvalidError } from "../errors/UserInvalidError";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "../services/EmailService";
import { SessionService } from "../services/SessionService";
import { isValidMagicLink } from "../validations/isValidMagicLink";
import { isValidUser } from "../validations/isValidUser";

type SendMagicLinkArgs = {
  email: string;
  baseUrl: string;
};

export interface SendMagicLinkUseCase {
  (params: SendMagicLinkArgs): Promise<{ message: string }>;
}

export type Dependencies = {
  userRepository: UserRepository;
  sessionService: SessionService;
  emailService: EmailService;
};

export const createSendMagicLinkUseCase = ({
  userRepository,
  sessionService,
  emailService,
}: Dependencies) => {
  return async ({ email, baseUrl }: SendMagicLinkArgs) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw UserNotFoundError("User not found", email);
    if (!isValidUser(user)) throw UserInvalidError("User invalid");

    const token = await sessionService.generateToken(user.uuid);
    if (!token) throw GenerateTokenError("Failed to generate token");

    const magicLink = await emailService.generateMagicLink(baseUrl, token);
    if (!isValidMagicLink(magicLink, baseUrl, token)) {
      throw MagicLinkInvalidError("Invalid magic link");
    }

    const response = await emailService.sendMagicLinkEmail(magicLink);
    if (!response) throw SendMagicLinkError("Failed to send magic link email");

    return { message: response };
  };
};
