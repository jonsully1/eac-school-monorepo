import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "../services/EmailService";
import { TokenValidator } from "../services/TokenValidator";

type SendMagicLinkArgs = {
  email: string;
  baseUrl: string;
};

export interface SendMagicLinkUseCase {
  (params: SendMagicLinkArgs): Promise<{ message: string }>;
}

export type Dependencies = {
  userRepository: UserRepository;
  tokenValidator: TokenValidator;
  emailService: EmailService;
};

export const createSendMagicLinkUseCase = ({
  userRepository,
  tokenValidator,
  emailService,
}: Dependencies) => {
  return async ({ email, baseUrl }: SendMagicLinkArgs) => {
    const user = await userRepository.findByEmail(email);
    const token = await tokenValidator.generate(user?.uuid || "");
    const magicLink = await emailService.generateMagicLink(baseUrl, token);
    const response = await emailService.sendMagicLinkEmail(magicLink);
    return { message: response };
  };
};
