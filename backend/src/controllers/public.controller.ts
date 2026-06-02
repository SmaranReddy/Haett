import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../utils";
import * as publicService from "../services/public.service";

export const getPlatformStats = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const stats = await publicService.getPlatformStats();
    sendSuccess(res, stats, "Platform stats fetched successfully");
  }
);
