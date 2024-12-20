export type TokenValidator = {
  validate(token: string): Promise<boolean>;
};
