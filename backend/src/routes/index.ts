import { Router } from "express";
import authRoutes from ".";
import taskRoutes from "./task.routes";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.use("/auth", authRoutes);
router.use("/tasks", authMiddleware, taskRoutes);

export default router;
