import { DatabaseClient } from "../../../common/DatabaseClient";
import { User } from "../entities/User";

export type UserRepository = {
  findByEmail: (
    dbClient: DatabaseClient,
    email: string,
  ) => Promise<User | false>;
};
