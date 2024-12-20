import { TokenValidator } from "../../src/core/domain/user/services/TokenValidator";

export const MockTokenValidator: TokenValidator = {
  validate: jest.fn(),
  generate: jest.fn(),
};
