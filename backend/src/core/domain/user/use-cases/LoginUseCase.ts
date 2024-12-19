import { Credentials, User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { PasswordValidator } from "../services/PasswordValidator";

interface ILoginUseCase {
  (
    userRepository: UserRepository,
    passwordValidator: PasswordValidator,
    credentials: Credentials,
  ): Promise<User | false>;
}

export const LoginUseCase: ILoginUseCase = async (
  userRespository,
  passwordValidator,
  credentials,
) => {
  const user = await userRespository.findByEmail(credentials?.email);
  if (!user) throw new Error("User not found");

  if (
    !(await passwordValidator.validate(credentials?.password, user?.password))
  )
    throw new Error("Invalid credentials");

  return user;
};
