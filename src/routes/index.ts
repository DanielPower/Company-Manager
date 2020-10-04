import { Router } from "express";
import authorizeRouter from "./authorize";
import jobRouter from "./jobs";
import employeesRouter from "./employees";
import payperiodRouter from "./payperiods";
import shiftRouter from "./shifts";

// Init router and path
const router = Router();
router.use("/authorize", authorizeRouter);
router.use("/jobs", jobRouter);
router.use("/employees", employeesRouter);
router.use("/payperiod", payperiodRouter);
router.use("/shifts", shiftRouter);

// Export the base-router
export default router;
