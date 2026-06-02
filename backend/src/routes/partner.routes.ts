import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  createApplicationSchema,
  reapplySchema,
} from "../validations/partner.validation";
import * as partnerController from "../controllers/partner.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createApplicationSchema),
  partnerController.createApplication
);

router.get(
  "/me",
  authenticate,
  partnerController.getMyApplication
);

router.put(
  "/reapply",
  authenticate,
  validate(reapplySchema),
  partnerController.reapply
);

export default router;
