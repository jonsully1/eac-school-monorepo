import { LoginUseCase } from "../../../../../src/core/domain/user/use-cases/LoginUseCase";
import { MockDatabaseClient } from "../../../../mockData/mockDatabaseClient";
import { MockPasswordValidator } from "../../../../mockData/mockPasswordValidator";
import {
  mockUser,
  mockLoginCredentials,
  MockUserRespository,
} from "../../../../mockData/mockUser";

describe("Login Use Case", () => {
  it("should return the user object when password is correct", async () => {
    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(mockUser);
    jest.spyOn(MockPasswordValidator, "validate").mockResolvedValue(true);

    const response = await LoginUseCase(
      MockDatabaseClient,
      MockUserRespository,
      MockPasswordValidator,
      mockLoginCredentials,
    );

    expect(response).toStrictEqual(mockUser);
  });

  it("should throw error if user email is not found", async () => {
    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(false);

    await expect(
      LoginUseCase(
        MockDatabaseClient,
        MockUserRespository,
        MockPasswordValidator,
        mockLoginCredentials,
      ),
    ).rejects.toThrow("User not found");
  });

  it("should return false if the user password is not valid", async () => {
    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(mockUser);
    jest.spyOn(MockPasswordValidator, "validate").mockResolvedValue(false);

    await expect(
      LoginUseCase(
        MockDatabaseClient,
        MockUserRespository,
        MockPasswordValidator,
        mockLoginCredentials,
      ),
    ).rejects.toThrow("Invalid credential");
  });
});
