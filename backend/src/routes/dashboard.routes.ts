import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import * as dashboardController from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/",
  authenticate,
  dashboardController.getDashboard
);

export default router;
