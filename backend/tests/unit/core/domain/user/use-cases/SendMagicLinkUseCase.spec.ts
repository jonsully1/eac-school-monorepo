import {
  mockUser,
  MockUserRespository,
} from "../../../../../mockData/mockUser";
import {
  mockSendMagicLinkResponse,
  mockExpectedMagicLink,
  mockBaseUrl,
  mockToken,
} from "../../../../../mockData/mockEmail";
import { EmailService } from "../../../../../../src/core/domain/user/services/EmailService";
import {
  createSendMagicLinkUseCase,
  type SendMagicLinkUseCase,
} from "../../../../../../src/core/domain/user/use-cases/SendMagicLinkUseCase";
import { Dependencies } from "../../../../../../src/core/domain/user/use-cases/SendMagicLinkUseCase";
import { MockSessionService } from "../../../../../mockData/mockSessionService";

const MockEmailService: EmailService = {
  generateMagicLink: jest.fn(),
  sendMagicLinkEmail: jest.fn(),
};

describe("SendMagicLink Use Case", () => {
  let SendMagicLinkUseCase: null | SendMagicLinkUseCase;
  let dependencies: null | Dependencies;
  const sendMagicLinkArgs = { email: mockUser.email, baseUrl: mockBaseUrl };

  beforeEach(() => {
    dependencies = {
      userRepository: MockUserRespository,
      sessionService: MockSessionService,
      emailService: MockEmailService,
    };

    SendMagicLinkUseCase = createSendMagicLinkUseCase(dependencies);
  });

  it("should send a magic link to the user if they exist", async () => {
    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(mockUser);
    jest
      .spyOn(MockSessionService, "generateToken")
      .mockResolvedValue(mockToken);
    jest
      .spyOn(MockEmailService, "generateMagicLink")
      .mockResolvedValue(mockExpectedMagicLink);
    jest
      .spyOn(MockEmailService, "sendMagicLinkEmail")
      .mockResolvedValue(mockSendMagicLinkResponse);

    const response = await SendMagicLinkUseCase!(sendMagicLinkArgs);

    expect(response).toStrictEqual({ message: mockSendMagicLinkResponse });
  });

  it("should throw UserNotFoundError if user does not exist", async () => {
    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(null);
    await expect(SendMagicLinkUseCase!(sendMagicLinkArgs)).rejects.toThrow(
      "User not found",
    );
  });

  it("should throw UserInvalidError if user data is incomplete", async () => {
    const user = { ...mockUser };
    user.password = "";

    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(user);
    await expect(SendMagicLinkUseCase!(sendMagicLinkArgs)).rejects.toThrow(
      "User invalid",
    );
  });

  it("should throw GenerateTokenError if token generation fails", async () => {
    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(mockUser);
    jest.spyOn(MockSessionService, "generateToken").mockResolvedValue(false);
    await expect(SendMagicLinkUseCase!(sendMagicLinkArgs)).rejects.toThrow(
      "Failed to generate token",
    );
  });

  it("should throw MagicLinkInvalidError if magic link is invalid", async () => {
    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(mockUser);
    jest
      .spyOn(MockSessionService, "generateToken")
      .mockResolvedValue(mockToken);
    jest
      .spyOn(MockEmailService, "generateMagicLink")
      .mockResolvedValue("invalidMagicLink");
    await expect(SendMagicLinkUseCase!(sendMagicLinkArgs)).rejects.toThrow(
      "Invalid magic link",
    );
  });

  it("should throw SendMagicLinkError if magic link email fails to send", async () => {
    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(mockUser);
    jest
      .spyOn(MockSessionService, "generateToken")
      .mockResolvedValue(mockToken);
    jest
      .spyOn(MockEmailService, "generateMagicLink")
      .mockResolvedValue(mockExpectedMagicLink);
    jest.spyOn(MockEmailService, "sendMagicLinkEmail").mockResolvedValue(false);

    await expect(SendMagicLinkUseCase!(sendMagicLinkArgs)).rejects.toThrow(
      "Failed to send magic link email",
    );
  });
});
