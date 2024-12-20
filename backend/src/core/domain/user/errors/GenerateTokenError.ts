interface GenerateTokenError extends Error {
  name: "GenerateTokenError";
}

export const GenerateTokenError = (msg: string) => {
  const error = new Error(msg) as GenerateTokenError;
  error.name = "GenerateTokenError";
  return error;
};
