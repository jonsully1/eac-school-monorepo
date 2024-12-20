import {
  createLoginUseCase,
  type LoginUseCase,
  type Dependencies,
} from "../../../../../../src/core/domain/user/use-cases/LoginUseCase";
import { MockSessionService } from "../../../../../mockData/mockSessionService";
import {
  mockUser,
  mockLoginCredentials,
  MockUserRespository,
} from "../../../../../mockData/mockUser";

describe("Login Use Case", () => {
  let LoginUseCase: null | LoginUseCase;
  let dependencies: null | Dependencies;

  beforeEach(() => {
    dependencies = {
      userRepository: MockUserRespository,
      sessionService: MockSessionService,
    };

    LoginUseCase = createLoginUseCase(dependencies);
  });

  it("should return the user object when password is correct", async () => {
    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(mockUser);
    jest.spyOn(MockSessionService, "validateToken").mockResolvedValue(true);

    const response = await LoginUseCase!(mockLoginCredentials);

    expect(response).toStrictEqual(mockUser);
  });

  it("should throw error if user email is not found", async () => {
    jest
      .spyOn(MockUserRespository, "findByEmail")
      .mockRejectedValue(new Error("User not found"));

    await expect(LoginUseCase!(mockLoginCredentials)).rejects.toThrow(
      "User not found",
    );
  });

  it("should throw error if the user password is not valid", async () => {
    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(mockUser);
    jest
      .spyOn(MockSessionService, "validateToken")
      .mockRejectedValue(new Error("Invalid token"));

    await expect(LoginUseCase!(mockLoginCredentials)).rejects.toThrow(
      "Invalid token",
    );
  });
});
