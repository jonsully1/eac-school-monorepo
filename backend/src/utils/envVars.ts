export interface DbConfig {
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

export const envVars = async () => ({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  SALT: process.env.SALT,
  LOGIN_TOKEN_EXPIRY: process.env.LOGIN_TOKEN_EXPIRY,
  EMAIL_CLIENT_API_KEY: process.env.EMAIL_CLIENT_API_KEY,
  EMAIL_CLIENT_MAGIC_LINK_TEMPLATE_ID:
    process.env.EMAIL_CLIENT_MAGIC_LINK_TEMPLATE_ID,
  FROM_EMAIL: process.env.FROM_EMAIL,
  TO_EMAIL: process.env.TO_EMAIL,
  SESSION_TOKEN_EXIRES: process.env.SESSION_TOKEN_EXIRES,
  SESSION_REFRESH_TOKEN_EXIRES: process.env.SESSION_REFRESH_TOKEN_EXIRES,
  NODE_ENV: process.env.NODE_ENV,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  AWS_SES_SMTP_ENDPOINT: process.env.AWS_SES_SMTP_ENDPOINT,
  AWS_SMTP_USERNAME: process.env.AWS_SMTP_USERNAME,
  AWS_SMTP_PASSWORD: process.env.AWS_SMTP_PASSWORD,
});
