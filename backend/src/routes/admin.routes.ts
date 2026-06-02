import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  statusQuerySchema,
  rejectApplicationSchema,
  toggleCodeParamsSchema,
} from "../validations/partner.validation";
import * as partnerController from "../controllers/partner.controller";
import * as discountCodeController from "../controllers/discount-code.controller";
import { Role } from "@prisma/client";

const router = Router();

router.get(
  "/partner-applications",
  authenticate,
  authorize(Role.ADMIN),
  validate(statusQuerySchema),
  partnerController.getAllApplications
);

router.patch(
  "/partner-applications/:id/approve",
  authenticate,
  authorize(Role.ADMIN),
  partnerController.approveApplication
);

router.patch(
  "/partner-applications/:id/reject",
  authenticate,
  authorize(Role.ADMIN),
  validate(rejectApplicationSchema),
  partnerController.rejectApplication
);

router.patch(
  "/discount-codes/:id/toggle",
  authenticate,
  authorize(Role.ADMIN),
  validate(toggleCodeParamsSchema),
  discountCodeController.toggleCode
);

export default router;
