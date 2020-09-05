import { Router } from "express";
import loginRouter from "./login";

// Init router and path
const router = Router();
router.use("/login", loginRouter);

// Export the base-router
export default router;
