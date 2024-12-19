import { User } from "../entities/User";

export type UserRepository = {
  findByEmail: (email: string) => Promise<User | false>;
};
