import { DatabaseClient } from "../../../common/DatabaseClient";
import { Credentials, User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { PasswordValidator } from "../services/PasswordValidator";

interface ILoginUseCase {
  (
    dbClient: DatabaseClient,
    userRepository: UserRepository,
    passwordValidator: PasswordValidator,
    credentials: Credentials,
  ): Promise<User | false>;
}

export const LoginUseCase: ILoginUseCase = async (
  dbClient,
  userRespository,
  passwordValidator,
  credentials,
) => {
  const user = await userRespository.findByEmail(dbClient, credentials?.email);
  if (!user) throw new Error("User not found");

  if (
    !(await passwordValidator.validate(credentials?.password, user?.password))
  )
    throw new Error("Invalid credentials");

  return user;
};
