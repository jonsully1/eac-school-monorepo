export const isValidMagicLink = (
  link: string,
  baseUrl: string,
  token: string,
): boolean =>
  link.startsWith("http") &&
  link.includes(baseUrl) &&
  link.includes("magic-link") &&
  link.endsWith(token);
