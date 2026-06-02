import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../utils";
import * as dashboardService from "../services/dashboard.service";

export const getDashboard = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const dashboard = await dashboardService.getPartnerDashboard(userId);
    sendSuccess(res, dashboard, "Dashboard fetched successfully");
  }
);
