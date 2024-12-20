import jwt from "jsonwebtoken";
import { SessionService } from "../../../core/domain/user/services/SessionService";

export const createSessionService = (
  secret: string,
  expiresIn: number,
): SessionService => ({
  validateToken: async (token: string): Promise<boolean> =>
    jwt.verify(token, secret) ? true : false,
  generateToken: async (uuid: string) => {
    const now = new Date().getTime();
    const payload = { uuid };
    const options = { expiresIn: now + expiresIn };
    return jwt.sign(payload, secret, options);
  },
});
