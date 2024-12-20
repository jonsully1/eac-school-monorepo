import { EmailService } from "../../../core/domain/user/services/EmailService";

export const createEmailService = (): EmailService => ({
  generateMagicLink: async (baseUrl, token) => `${baseUrl}magic-link/${token}`,
  sendMagicLinkEmail: async (magicLink) => {
    try {
      // TODO: temp return string, implementation of method required
      return magicLink;
    } catch (err) {
      console.error(`Failed to send magic link: ${(err as Error).message}`);
      return false;
    }
  },
});
