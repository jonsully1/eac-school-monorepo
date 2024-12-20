import { DatabaseGateway } from "../../src/core/common/ports/DatabaseGateway";
import { UserRepository } from "../../src/core/domain/user/repositories/UserRepository";

export const mockLoginCredentials = {
  email: "user@email.com",
  token: "secretToken",
};

export const mockUser = {
  id: "1",
  email: mockLoginCredentials.email,
  password: "asdfshfiwjebhwpefu9348mvt3498c", // hashed, from db
  uuid: "a856c5bb-e755-47ec-9a46-66d5738e15db",
};

export const mockDbGateway: DatabaseGateway = {
  findOne: jest.fn().mockResolvedValue(mockUser),
  // findMany: jest.fn(),
  // insertOne: jest.fn(),
  // updateOne: jest.fn(),
  // deleteOne: jest.fn(),
};

export const MockUserRespository: UserRepository = {
  findByEmail: jest.fn(),
};
