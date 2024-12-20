import { User } from "../entities/User";

export type UserRepository = {
  findByEmail: (email: string) => Promise<User | null>;
  // createUser: (user: User) => Promise<User>;
};