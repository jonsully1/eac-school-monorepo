interface MagicLinkInvalidError extends Error {
  name: "MagicLinkInvalidError";
}

export const MagicLinkInvalidError = (msg: string) => {
  const error = new Error(msg) as MagicLinkInvalidError;
  error.name = "MagicLinkInvalidError";
  return error;
};
