import { Router } from "express";
import loginRouter from "./login";
import jobRouter from "./job";
import employeesRouter from "./employees";
import payperiodRouter from "./payperiod";

// Init router and path
const router = Router();
router.use("/login", loginRouter);
router.use("/jobs", jobRouter);
router.use("/employees", employeesRouter);
router.use("/payperiod", payperiodRouter);

// Export the base-router
export default router;
