import { DatabaseClient } from "../../common/persistence/DatabaseClient";
import { User } from "../entities/User";

export type UserRepository = {
  findByEmail: (
    dbClient: DatabaseClient,
    email: string,
  ) => Promise<User | false>;
};
