import { DatabaseClient } from "../../../core/common/DatabaseClient";
import { User } from "../../../core/domain/user/entities/User";
import { UserRepository } from "../../../core/domain/user/repositories/UserRepository";

export const UserRepositoryImpl: UserRepository = {
  findByEmail: async (
    dbClient: DatabaseClient,
    email: string,
  ): Promise<User> => {
    const user = await dbClient.findOne<User>("users", email);
    if (!user) throw new Error("User not found");
    return user;
  },
};
