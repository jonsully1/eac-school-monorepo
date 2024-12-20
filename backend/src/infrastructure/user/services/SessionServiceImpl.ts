import jwt from "jsonwebtoken";
import { SessionService } from "../../../core/domain/user/services/SessionService";

interface CustomJwtPayload extends jwt.JwtPayload {
  uuid: string;
}

export type { CustomJwtPayload };

export const createSessionService = (
  secret: string,
  expiresIn: number,
): SessionService => ({
  validateToken: async (token: string) => {
    try {
      jwt.verify(token, secret);
      return true;
    } catch (err) {
      console.error(`Failed to validate token: ${(err as Error).message}`);
      return false;
    }
  },
  generateToken: async (uuid: string) => {
    try {
      const now = new Date().getTime();
      const payload = { uuid };
      const options = { expiresIn: now + expiresIn };
      return jwt.sign(payload, secret, options);
    } catch (err) {
      console.error(`Failed to generate token: ${(err as Error).message}`);
      return false;
    }
  },
});
