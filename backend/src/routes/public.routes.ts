import { Router } from "express";
import * as publicController from "../controllers/public.controller";

const router = Router();

router.get(
  "/platform-stats",
  publicController.getPlatformStats
);

export default router;
