import { EmailService } from "../../../core/domain/user/services/EmailService";

export const createEmailService = (): EmailService => ({
  generateMagicLink: async (baseUrl, token) => `${baseUrl}magic-link/${token}`,
  sendMagicLinkEmail: async (magicLink) => {
    // TODO: temp return string, implementation of method required
    return magicLink;
  },
});
