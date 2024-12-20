import jwt from "jsonwebtoken";
import { SessionService } from "../../../../../src/core/domain/user/services/SessionService";
import { createSessionService } from "../../../../../src/infrastructure/user/services/SessionService";
import { envVars } from "../../../../../src/utils/envVars";

describe("SessionService", () => {
  const fakeToken = "sdfdhrehgerg.ewrf1234213423.r24rdfsdf";
  const payload = { id: 1 };
  const options = { expiresIn: 0 };

  let SessionService: null | SessionService;
  let secret: null | string;
  let expiresIn: null | number;

  beforeEach(async () => {
    const { SALT, LOGIN_TOKEN_EXPIRY } = await envVars();
    secret = SALT as string;
    expiresIn = Number(LOGIN_TOKEN_EXPIRY);
    options.expiresIn = expiresIn;
    SessionService = createSessionService(secret, expiresIn);
  });

  it("should return a decoded JWT object if the token is valid, i.e. signed with the secret", async () => {
    const signedToken = jwt.sign(payload, secret!, options);

    const response = await SessionService!.validateToken(signedToken);

    expect(response).toStrictEqual(true);
  });

  it("should throw an error if the token is not signed", async () => {
    await expect(SessionService!.validateToken(fakeToken)).rejects.toThrow(
      "invalid token",
    );
  });
});
