interface SendMagicLinkError extends Error {
  name: "SendMagicLinkError";
}

export const SendMagicLinkError = (msg: string) => {
  const error = new Error(msg) as SendMagicLinkError;
  error.name = "SendMagicLinkError";
  return error;
};
