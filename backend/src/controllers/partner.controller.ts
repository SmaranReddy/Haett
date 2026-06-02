import { Request, Response } from "express";
import { asyncHandler, sendCreated, sendSuccess } from "../utils";
import * as partnerService from "../services/partner.service";

export const createApplication = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const application = await partnerService.createApplication(userId, req.body);
    sendCreated(res, application, "Application submitted successfully");
  }
);

export const getMyApplication = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const application = await partnerService.getMyApplication(userId);
    sendSuccess(res, application, "Application fetched successfully");
  }
);

export const reapply = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const application = await partnerService.reapply(userId, req.body);
    sendSuccess(res, application, "Application resubmitted successfully");
  }
);

export const getAllApplications = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const status = req.query.status as string | undefined;
    const applications = await partnerService.getAllApplications(status);
    sendSuccess(res, applications, "Applications fetched successfully");
  }
);

export const approveApplication = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const result = await partnerService.approveApplication(id);
    sendSuccess(res, result, "Application approved successfully");
  }
);

export const rejectApplication = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const { reason } = req.body;
    const application = await partnerService.rejectApplication(id, reason);
    sendSuccess(res, application, "Application rejected successfully");
  }
);
