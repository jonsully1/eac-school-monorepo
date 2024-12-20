import jwt from "jsonwebtoken";
import { createTokenValidator } from "../../../../../src/infrastructure/user/services/TokenValidator";

describe("TokenValidator", () => {
  const fakenToken = "sdfdhrehgerg.ewrf1234213423.r24rdfsdf";
  const secret = "12345";
  const payload = { id: 1 };
  const options = { expiresIn: 900000 };

  it("should return a decoded JWT object if the token is valid, i.e. signed with the secret", async () => {
    const signedToken = jwt.sign(payload, secret, options);

    const TokenValidator = createTokenValidator(secret);
    const response = await TokenValidator.validate(signedToken);

    expect(response).toStrictEqual(true);
  });

  it("should throw an error if the token is not signed", async () => {
    const TokenValidator = createTokenValidator(secret);

    await expect(TokenValidator.validate(fakenToken)).rejects.toThrow(
      "invalid token",
    );
  });
});
