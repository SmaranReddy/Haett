import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../utils";
import * as userService from "../services/user.service";

export const getProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const user = await userService.getProfile(userId);
    sendSuccess(res, user, "Profile fetched successfully");
  }
);

export const getUserById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const user = await userService.getUserById(id);
    sendSuccess(res, user, "User fetched successfully");
  }
);
