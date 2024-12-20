import { DatabaseGateway } from "../../../core/common/ports/DatabaseGateway";
import { UserRepository } from "../../../core/domain/user/repositories/UserRepository";

export const createUserRepository = (
  dbGateway: DatabaseGateway,
): UserRepository => ({
  findByEmail: async (email) => {
    const admin = await dbGateway.findOne(
      ["id", "uuid", "name", "surname", "email"],
      "admin",
      { email, active: 1 },
    );

    return admin;
  },
});
