import { MockTokenValidator } from "../../../../../mockData/mockTokenValidator";
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
      tokenValidator: MockTokenValidator,
      emailService: MockEmailService,
    };

    SendMagicLinkUseCase = createSendMagicLinkUseCase(dependencies);
  });

  it("should send a magic link to the user if they exist", async () => {
    jest.spyOn(MockUserRespository, "findByEmail").mockResolvedValue(mockUser);
    jest.spyOn(MockTokenValidator, "generate").mockResolvedValue(mockToken);
    jest
      .spyOn(MockEmailService, "generateMagicLink")
      .mockResolvedValue(mockExpectedMagicLink);
    jest
      .spyOn(MockEmailService, "sendMagicLinkEmail")
      .mockResolvedValue(mockSendMagicLinkResponse);

    const response = await SendMagicLinkUseCase!(sendMagicLinkArgs);

    expect(response).toStrictEqual({ message: mockSendMagicLinkResponse });
  });
});
