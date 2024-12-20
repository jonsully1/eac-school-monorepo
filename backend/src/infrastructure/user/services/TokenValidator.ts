import jwt from "jsonwebtoken";
import { TokenValidator } from "../../../core/domain/user/services/TokenValidator";

export const createTokenValidator = (secret: string): TokenValidator => ({
  validate: async (token: string): Promise<boolean> =>
    jwt.verify(token, secret) ? true : false,
});
