import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import partnerRoutes from "./partner.routes";
import adminRoutes from "./admin.routes";
import dashboardRoutes from "./dashboard.routes";
import publicRoutes from "./public.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/partner-applications", partnerRoutes);
router.use("/admin", adminRoutes);
router.use("/partner-dashboard", dashboardRoutes);
router.use("/public", publicRoutes);

export default router;
