import { UserRepository } from "../../../../../src/core/domain/user/repositories/UserRepository";
import { createUserRepository } from "../../../../../src/infrastructure/user/repositories/UserRepositoryImpl";
import { mockUser, mockDbGateway } from "../../../../mockData/mockUser";

describe("UserRepositoryImpl: findByEmail", () => {
  let userRepositoryImpl: null | UserRepository;

  beforeEach(() => {
    userRepositoryImpl = createUserRepository(mockDbGateway);
  });

  it("should return the user if found", async () => {
    jest.spyOn(mockDbGateway, "findOne").mockResolvedValue(mockUser);

    const response = await userRepositoryImpl!.findByEmail(mockUser.email);

    expect(response).toStrictEqual(mockUser);
  });

  it("should throw error if user email is not found", async () => {
    jest.spyOn(mockDbGateway, "findOne").mockResolvedValue(false);

    await expect(
      userRepositoryImpl!.findByEmail(mockUser.email),
    ).rejects.toThrow("User not found");
  });
});
