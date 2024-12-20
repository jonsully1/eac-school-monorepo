import jwt from "jsonwebtoken";
import { SessionService } from "../../../../../src/core/domain/user/services/SessionService";
import {
  createSessionService,
  type CustomJwtPayload,
} from "../../../../../src/infrastructure/user/services/SessionServiceImpl";
import { envVars } from "../../../../../src/utils/envVars";
import { mockUser } from "../../../../mockData/mockUser";

describe("SessionService", () => {
  const fakeToken = "sdfdhrehgerg.ewrf1234213423.r24rdfsdf";
  const payload = { id: 1 };
  const options = { expiresIn: 0 };

  let SessionService: null | SessionService;
  let secret: null | string;
  let expiresIn: null | number;

  beforeAll(async () => {
    const { SALT, LOGIN_TOKEN_EXPIRY } = await envVars();
    secret = SALT as string;
    expiresIn = Number(LOGIN_TOKEN_EXPIRY);
    options.expiresIn = expiresIn;
    SessionService = createSessionService(secret, expiresIn);
  });

  describe("validateToken", () => {
    it("should return true if the token is valid, i.e. signed with the secret", async () => {
      const signedToken = jwt.sign(payload, secret!, options);
      const tokenIsValid = await SessionService!.validateToken(signedToken);
      expect(tokenIsValid).toStrictEqual(true);
    });

    it("should return false if the token is not signed", async () => {
      const tokenIsValid = await SessionService!.validateToken(fakeToken);
      expect(tokenIsValid).toStrictEqual(false);
    });
  });

  describe("generateToken", () => {
    it("should return a signed token", async () => {
      const response = await SessionService!.generateToken(mockUser.uuid);
      const decoded = jwt.verify(response, secret!) as CustomJwtPayload;
      expect(decoded.uuid).toStrictEqual(mockUser.uuid);
    });

    it("should throw an error if uuid is missing", async () => {
      await expect(SessionService!.generateToken("")).rejects.toThrow(
        "uuid is required",
      );
    });
  });
});
