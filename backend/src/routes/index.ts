import { Router } from "express";
import authRoutes from "./auth.routes";
import taskRoutes from "./task.routes";

import { authMiddleware } from "../middlewares/auth";

const router = Router();
router.use("/auth", authRoutes);
router.use("/tasks", authMiddleware, taskRoutes);

export default router;
