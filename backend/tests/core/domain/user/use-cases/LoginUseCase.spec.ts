import { LoginUseCase } from "../../../../../src/core/domain/user/use-cases/LoginUseCase";
import { UserRespository } from "../../../../../src/core/domain/user/repositories/UserRepository";
import { PasswordValidator } from "../../../../../src/core/domain/user/services/PasswordValidator";

const MockUserRespository: UserRespository = {
  findByEmail: jest.fn(),
};

const MockPasswordValidator: PasswordValidator = {
  validate: jest.fn(),
};

describe("Login Use Case", () => {
  it("should return the user's email when password is correct", async () => {
    const credentials = { email: "user@email.com", password: "secretPassword" };

    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue({
      id: "1",
      email: credentials.email,
      password: "asdfshfiwjebhwpefu9348mvt3498c",
    });

    jest.spyOn(MockPasswordValidator, "validate").mockResolvedValue(true);

    const response = await LoginUseCase(
      MockUserRespository,
      MockPasswordValidator,
      credentials,
    );

    expect(response).toStrictEqual({
      email: credentials.email,
    });
  });

  it("should throw error if user email is not found", async () => {
    const credentials = { email: "user@email.com", password: "secretPassword" };

    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(false);

    await expect(
      LoginUseCase(MockUserRespository, MockPasswordValidator, credentials),
    ).rejects.toThrow("User not found");
  });

  it("should return false if the user password is not valid", async () => {
    const credentials = { email: "user@email.com", password: "secretPassword" };

    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue({
      id: "1",
      email: credentials.email,
      password: "asdfshfiwjebhwpefu9348mvt3498c",
    });

    jest.spyOn(MockPasswordValidator, "validate").mockResolvedValue(false);

    await expect(
      LoginUseCase(MockUserRespository, MockPasswordValidator, credentials),
    ).rejects.toThrow("Invalid credential");
  });
});
