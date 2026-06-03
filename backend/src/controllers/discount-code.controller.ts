import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../utils";
import * as discountCodeService from "../services/discount-code.service";

export const getAll = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const codes = await discountCodeService.getAllDiscountCodes();
    sendSuccess(res, codes, "Discount codes fetched successfully");
  }
);

export const toggleCode = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const code = await discountCodeService.toggleDiscountCodeActive(id);
    sendSuccess(res, code, "Discount code toggled successfully");
  }
);
