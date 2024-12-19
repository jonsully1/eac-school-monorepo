import { PasswordValidator } from "../../src/core/domain/user/services/PasswordValidator";

export const MockPasswordValidator: PasswordValidator = {
  validate: jest.fn(),
};
