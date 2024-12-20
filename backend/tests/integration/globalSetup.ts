import dotenv from "dotenv";
import { createTables, seedTables } from "../utils/migration";
import mysql, { Connection } from "mysql2/promise";
import { envVars } from "../../src/utils/envVars";
import { dropTables } from "../utils/migration";

dotenv.config({
  path: "./.env.test",
});

module.exports = async () => {
  try {
    let db: null | Connection;
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, NODE_ENV } =
      await envVars();

    db = await mysql.createConnection(
      `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    );

    if (db) {
      await dropTables(db, NODE_ENV as "test");
      await createTables(db, NODE_ENV as "test");
      await seedTables(db, NODE_ENV as "test");
      console.info("db ready!");
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
