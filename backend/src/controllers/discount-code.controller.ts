import { Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../utils";
import * as discountCodeService from "../services/discount-code.service";

export const toggleCode = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const code = await discountCodeService.toggleDiscountCodeActive(id);
    sendSuccess(res, code, "Discount code toggled successfully");
  }
);
