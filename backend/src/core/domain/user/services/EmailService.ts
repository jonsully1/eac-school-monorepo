export type EmailService = {
  generateMagicLink(baseUrl: string, token: string): Promise<string>;
  sendMagicLinkEmail(magicLink: string): Promise<string>;
};
