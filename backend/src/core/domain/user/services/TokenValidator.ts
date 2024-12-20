export type TokenValidator = {
  validate(token: string): Promise<boolean>;
  generate(uuid: string): Promise<string>;
};
