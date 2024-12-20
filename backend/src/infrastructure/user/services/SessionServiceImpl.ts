import jwt from "jsonwebtoken";
import { SessionService } from "../../../core/domain/user/services/SessionService";

export interface CustomJwtPayload extends jwt.JwtPayload {
  uuid: string;
}

export const createSessionService = (
  secret: string,
  expiresIn: number,
): SessionService => ({
  validateToken: async (token: string) => {
    try {
      jwt.verify(token, secret);
      return true;
    } catch (e) {
      return false;
    }
  },
  generateToken: async (uuid: string) => {
    if (!uuid) throw new Error("uuid is required");
    const now = new Date().getTime();
    const payload = { uuid };
    const options = { expiresIn: now + expiresIn };
    return jwt.sign(payload, secret, options);
  },
});
