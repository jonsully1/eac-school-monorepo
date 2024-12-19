import { User } from "../entities/User";

export type UserRespository = {
  findByEmail: (email: string) => Promise<User | false>;
};
