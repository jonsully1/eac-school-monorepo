import { UserRespository } from "../repositories/UserRepository";
import { PasswordValidator } from "../services/PasswordValidator";

export const LoginUseCase = async (
  userRespository: UserRespository,
  passwordValidator: PasswordValidator,
  credentials: { email: string; password: string },
): Promise<{ email: string } | false> => {
  const user = await userRespository.findByEmail(credentials.email);
  if (!user) throw new Error("User not found");

  const isValid = await passwordValidator.validate(
    credentials.password,
    user.password,
  );
  if (!isValid) throw new Error("Invalid credentials");

  return { email: user.email };
};
