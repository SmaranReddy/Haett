import { Request, Response } from "express";
import { Role } from "@prisma/client";
import { asyncHandler, sendCreated, sendSuccess } from "../utils";
import { ForbiddenError } from "../utils/errors";
import * as authService from "../services/auth.service";

export const register = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    const result = await authService.registerUser({ name, email, password });
    sendCreated(res, result, "User registered successfully");
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });
    sendSuccess(res, result, "Login successful");
  }
);

export const adminLogin = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });
    if (result.user.role !== Role.ADMIN) {
      throw new ForbiddenError("Access denied. Admin privileges required.");
    }
    sendSuccess(res, result, "Admin login successful");
  }
);
