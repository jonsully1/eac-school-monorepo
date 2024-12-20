import mysql, { Connection } from "mysql2/promise";
import { createUserRepository } from "../../../../../src/infrastructure/user/repositories/UserRepositoryImpl";
import { createMysqlDatabaseGateway } from "../../../../../src/infrastructure/adapters/MysqlDatabaseGateway";
import { envVars } from "../../../../../src/utils/envVars";
import { UserRepository } from "../../../../../src/core/domain/user/repositories/UserRepository";
import { DatabaseGateway } from "../../../../../src/core/common/ports/DatabaseGateway";
import { admins } from "../../../../utils/testData";

describe("UserRepositoryImpl using MysqlDatabaseGateway: findByEmail", () => {
  let db: false | Connection;
  let dbGateway: null | DatabaseGateway;
  let userRepositoryImpl: null | UserRepository;
  const admin = admins[0];
  const [uuid, name, surname, email] = admin;
  const expectedAdmin = { id: 1, uuid, name, surname, email };
  const unknownEmail = "unknownEmail@email.com";

  beforeAll(async () => {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } =
      await envVars();

    db = await mysql.createConnection(
      `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    );
  });

  afterAll(() => {
    if (db) {
      db.destroy();
    }
  });

  beforeEach(() => {
    dbGateway = createMysqlDatabaseGateway(db as Connection);
    userRepositoryImpl = createUserRepository(dbGateway);
  });

  it("should return the admin user if found", async () => {
    const response = await userRepositoryImpl!.findByEmail(
      "osullivanj.01@gmail.com",
    );

    expect(response).toStrictEqual(expectedAdmin);
  });
  
  it("should return null if an unknown email is used", async () => {
    const response = await userRepositoryImpl!.findByEmail(
      unknownEmail,
    );

    expect(response).toStrictEqual(null);
  });
});
