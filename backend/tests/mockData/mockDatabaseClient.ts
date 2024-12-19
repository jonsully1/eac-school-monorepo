import { DatabaseClient } from "../../src/core/common/DatabaseClient";

export const MockDatabaseClient: DatabaseClient = {
  findOne: jest.fn(),
};