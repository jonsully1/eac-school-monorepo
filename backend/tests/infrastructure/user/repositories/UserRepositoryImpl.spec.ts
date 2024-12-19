import { UserRepositoryImpl } from "../../../../src/infrastructure/user/repositories/UserRepositoryImpl";
import { DatabaseClient } from "../../../../src/core/common/DatabaseClient";
import { mockUser } from "../../../mockData/mockUser";

const MockDatabaseClient: DatabaseClient = {
  findOne: jest.fn(),
};

describe("UserRepositoryImpl: findOne", () => {
  it("should return the user if found", async () => {
    jest.spyOn(MockDatabaseClient, "findOne").mockResolvedValue(mockUser);

    const response = await UserRepositoryImpl.findByEmail(
      MockDatabaseClient,
      mockUser.email,
    );

    expect(response).toStrictEqual(mockUser);
  });

  it("should throw error if user email is not found", async () => {
    jest.spyOn(MockDatabaseClient, "findOne").mockResolvedValue(false);

    await expect(
      UserRepositoryImpl.findByEmail(MockDatabaseClient, mockUser.email),
    ).rejects.toThrow("User not found");
  });
});
