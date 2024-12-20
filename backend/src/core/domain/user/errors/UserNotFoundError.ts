interface UserNotFoundError extends Error {
  name: "UserNotFoundError";
  id: string;
}

export const UserNotFoundError = (msg: string, id: string) => {
  const error = new Error(msg) as UserNotFoundError;
  error.name = "UserNotFoundError";
  error.id = id;
  return error;
};
