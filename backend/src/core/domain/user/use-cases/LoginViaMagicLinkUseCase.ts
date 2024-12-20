import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { SessionService } from "../services/SessionService";

export interface LoginViaMagicLinkUseCase {
  (credentials: Credentials): Promise<User | null>;
}

export type Dependencies = {
  userRepository: UserRepository;
  sessionService: SessionService;
};

type Credentials = {
  email: string;
  token: string;
};

export const createLoginViaMagicLinkUseCase = ({
  userRepository,
  sessionService,
}: Dependencies) => {
  return async (credentials: Credentials) => {
    const { email, token } = credentials;
    const user = await userRepository.findByEmail(email);
    await sessionService.validateToken(token);
    return user;
  };
};
