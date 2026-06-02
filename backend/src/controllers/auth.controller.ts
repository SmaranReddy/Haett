import { Request, Response } from "express";
import { asyncHandler, sendCreated, sendSuccess } from "../utils";
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
