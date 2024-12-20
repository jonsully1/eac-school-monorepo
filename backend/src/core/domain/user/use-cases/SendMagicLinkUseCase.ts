import { UserInvalidError } from "../errors/UserInvalidError";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "../services/EmailService";
import { SessionService } from "../services/SessionService";
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
    const magicLink = await emailService.generateMagicLink(baseUrl, token);
    const response = await emailService.sendMagicLinkEmail(magicLink);
    return { message: response };
  };
};
