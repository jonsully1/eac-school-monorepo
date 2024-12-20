import { type EmailService } from "../../../../../src/core/domain/user/services/EmailService";
import { createEmailService } from "../../../../../src/infrastructure/user/services/EmailService";
import {
  mockBaseUrl,
  mockExpectedMagicLink,
  mockToken,
} from "../../../../mockData/mockEmail";

describe("Email Service", () => {
  let EmailService: null | EmailService;

  beforeEach(() => {
    EmailService = createEmailService();
  });

  describe("generateMagicLink", () => {
    it("should return a url with a token appended, i.e. a magic link", async () => {
      const magicLink = await EmailService!.generateMagicLink(
        mockBaseUrl,
        mockToken,
      );
      expect(magicLink).toBe(mockExpectedMagicLink);
    });
  });
});
