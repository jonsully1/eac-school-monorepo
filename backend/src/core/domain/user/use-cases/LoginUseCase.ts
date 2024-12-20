import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { TokenValidator } from "../services/TokenValidator";

export interface LoginUseCase {
  (credentials: LoginCredentials): Promise<User | null>;
}

export type Dependencies = {
  userRepository: UserRepository;
  tokenValidator: TokenValidator;
};

type LoginCredentials = {
  email: string;
  token: string;
};

export const createLoginUseCase = ({
  userRepository,
  tokenValidator,
}: Dependencies) => {
  return async (credentials: LoginCredentials) => {
    const { email, token } = credentials;
    
    const user = await userRepository.findByEmail(email);
    await tokenValidator.validate(token);
    
    return user;
  };
};
