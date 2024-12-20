import mysql, { Connection } from "mysql2/promise";
import jwt, { sign } from "jsonwebtoken";
import { DatabaseGateway } from "../../../../../../src/core/common/ports/DatabaseGateway";
import {
  createLoginUseCase,
  type LoginUseCase,
  type Dependencies,
} from "../../../../../../src/core/domain/user/use-cases/LoginUseCase";
import { createUserRepository } from "../../../../../../src/infrastructure/user/repositories/UserRepositoryImpl";
import { createTokenValidator } from "../../../../../../src/infrastructure/user/services/TokenValidator";
import { createMysqlDatabaseGateway } from "../../../../../../src/infrastructure/adapters/MysqlDatabaseGateway";
import { envVars } from "../../../../../../src/utils/envVars";
import { admins } from "../../../../../utils/testData";

describe("Login Use Case", () => {
  const [uuid, name, surname, email] = admins[0];
  const expectedAdmin = { id: 1, uuid, name, surname, email };
  const payload = { id: 1 };
  const options = { expiresIn: 0 };
  const loginCredentials = { email, token: "" };
  const unknownEmail = "unknownEmail@email.com";
  const fakeToken = "sdfdhrehgerg.ewrf1234213423.r24rdfsdf";

  let db: false | Connection;
  let dbGateway: null | DatabaseGateway;
  let LoginUseCase: null | LoginUseCase;
  let dependencies: null | Dependencies;
  let secret: null | string;
  let expiresIn: null | number;

  beforeAll(async () => {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = await envVars();

    db = await mysql.createConnection(
      `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    );
  });

  beforeEach(async () => {
    const { SALT, LOGIN_TOKEN_EXPIRY } = await envVars();
    secret = SALT as string;
    expiresIn = Number(LOGIN_TOKEN_EXPIRY);
    options.expiresIn = expiresIn;

    dbGateway = createMysqlDatabaseGateway(db as Connection);

    dependencies = {
      userRepository: createUserRepository(dbGateway),
      tokenValidator: createTokenValidator(secret, expiresIn),
    };

    LoginUseCase = createLoginUseCase(dependencies);
  });

  afterAll(() => {
    if (db) {
      db.destroy();
    }
  });

  it("should return the user object when password is correct", async () => {
    const signedToken = jwt.sign(payload, secret!, options);
    loginCredentials.token = signedToken;

    const response = await LoginUseCase!(loginCredentials);

    expect(response).toStrictEqual(expectedAdmin);
  });

  it("should throw error if user email is not found", async () => {
    const signedToken = jwt.sign(payload, secret!, options);

    await expect(
      LoginUseCase!({ email: unknownEmail, token: signedToken }),
    ).rejects.toThrow("User not found");
  });

  it("should throw error if token is invalid", async () => {
    await expect(LoginUseCase!({ email, token: fakeToken })).rejects.toThrow(
      "invalid token",
    );
  });
});
