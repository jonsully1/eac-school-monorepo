import { User } from "../entities/User";

const isValidId = (id: string): boolean =>
  typeof id === "string" && id.trim().length > 0;

const isValidUuid = (uuid?: string): boolean =>
  !uuid || typeof uuid === "string";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => password.length >= 8;

export const isValidUser = (user: User): boolean => {
  return (
    isValidId(user.id) &&
    isValidUuid(user.uuid) &&
    isValidEmail(user.email) &&
    isValidPassword(user.password)
  );
};
