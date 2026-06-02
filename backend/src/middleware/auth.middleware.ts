import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { UnauthorizedError, ForbiddenError } from "../utils/errors";
import { asyncHandler } from "../utils/async-handler";
import { Role } from "@prisma/client";

export const authenticate = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch {
      throw new UnauthorizedError("Invalid or expired token");
    }
  }
);

export const authorize = (...roles: Role[]) => {
  return asyncHandler(
    async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
      if (!req.user) {
        throw new UnauthorizedError("Not authenticated");
      }
      if (!roles.includes(req.user.role as Role)) {
        throw new ForbiddenError("Insufficient permissions");
      }
      next();
    }
  );
};
