import jwt from "jsonwebtoken";
import { TokenValidator } from "../../../core/domain/user/services/TokenValidator";

export const createTokenValidator = (
  secret: string,
  expiresIn: number,
): TokenValidator => ({
  validate: async (token: string): Promise<boolean> =>
    jwt.verify(token, secret) ? true : false,
  generate: async (uuid: string) => {
    const now = new Date().getTime();
    const payload = { uuid };
    const options = { expiresIn: now + expiresIn };
    return jwt.sign(payload, secret, options);
  },
});
