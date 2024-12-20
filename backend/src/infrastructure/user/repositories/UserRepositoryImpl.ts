import { DatabaseGateway } from "../../../core/common/ports/DatabaseGateway";
import { UserRepository } from "../../../core/domain/user/repositories/UserRepository";

export const createUserRepository = (
  dbGateway: DatabaseGateway,
): UserRepository => ({
  findByEmail: async (email) => {
    const columns = ["id", "uuid", "name", "surname", "email"];
    const table = "admin";
    const query = { email, active: 1 };
    const admin = await dbGateway.findOne(columns, table, query);
    return admin;
  },
});
