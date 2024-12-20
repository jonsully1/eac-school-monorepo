export type SessionService = {
  validateToken(token: string): Promise<boolean>;
  generateToken(uuid: string): Promise<string>;
};
