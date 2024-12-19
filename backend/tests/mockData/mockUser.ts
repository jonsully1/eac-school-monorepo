import { UserRepository } from "../../src/core/domain/user/repositories/UserRepository";

export const mockLoginCredentials = { email: "user@email.com", password: "secretPassword" };

export const mockUser = {
  id: "1",
  email: mockLoginCredentials.email,
  password: "asdfshfiwjebhwpefu9348mvt3498c", // hashed, from db
};

export const MockUserRespository: UserRepository = {
  findByEmail: jest.fn(),
};