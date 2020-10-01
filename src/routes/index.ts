import { Router } from "express";
import loginRouter from "./login";
import jobRouter from "./job";

// Init router and path
const router = Router();
router.use("/login", loginRouter);
router.use("/jobs", jobRouter);

// Export the base-router
export default router;
