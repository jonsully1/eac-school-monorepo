import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { SessionService } from "../services/SessionService";

export interface LoginUseCase {
  (credentials: LoginCredentials): Promise<User | null>;
}

export type Dependencies = {
  userRepository: UserRepository;
  sessionService: SessionService;
};

type LoginCredentials = {
  email: string;
  token: string;
};

export const createLoginUseCase = ({
  userRepository,
  sessionService,
}: Dependencies) => {
  return async (credentials: LoginCredentials) => {
    const { email, token } = credentials;

    const user = await userRepository.findByEmail(email);
    await sessionService.validateToken(token);

    return user;
  };
};
