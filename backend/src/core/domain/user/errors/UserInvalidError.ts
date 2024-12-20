interface UserInvalidError extends Error {
  name: "UserInvalidError";
}

export const UserInvalidError = (msg: string) => {
  const error = new Error(msg) as UserInvalidError;
  error.name = "UserInvalidError";
  return error;
};
