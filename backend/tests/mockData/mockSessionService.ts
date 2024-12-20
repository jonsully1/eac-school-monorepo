import { SessionService } from "../../src/core/domain/user/services/SessionService";

export const MockSessionService: SessionService = {
  validateToken: jest.fn(),
  generateToken: jest.fn(),
};
