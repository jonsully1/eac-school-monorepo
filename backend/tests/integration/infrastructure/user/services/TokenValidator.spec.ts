import jwt from "jsonwebtoken";
import { createTokenValidator } from "../../../../../src/infrastructure/user/services/TokenValidator";
import { envVars } from "../../../../../src/utils/envVars";
import { TokenValidator } from "../../../../../src/core/domain/user/services/TokenValidator";

describe("TokenValidator", () => {
  const fakenToken = "sdfdhrehgerg.ewrf1234213423.r24rdfsdf";
  const payload = { id: 1 };
  const options = { expiresIn: 0 };

  let TokenValidator: null | TokenValidator;
  let secret: null | string;
  let expiresIn: null | number;

  beforeEach(async () => {
    const { SALT, LOGIN_TOKEN_EXPIRY } = await envVars();
    secret = SALT as string;
    expiresIn = Number(LOGIN_TOKEN_EXPIRY);
    options.expiresIn = expiresIn;
    TokenValidator = createTokenValidator(secret, expiresIn);
  });

  it("should return a decoded JWT object if the token is valid, i.e. signed with the secret", async () => {
    const signedToken = jwt.sign(payload, secret!, options);

    const response = await TokenValidator!.validate(signedToken);

    expect(response).toStrictEqual(true);
  });

  it("should throw an error if the token is not signed", async () => {
    await expect(TokenValidator!.validate(fakenToken)).rejects.toThrow(
      "invalid token",
    );
  });
});
