import { Router } from "express";
import * as db from "../zapatos/src";
import * as s from "../zapatos/schema";
import { pool } from "../server";

// Add sub-routes
const shiftRouter = Router();

shiftRouter.get("/", async (request, response, _next) => {
  const { payPeriodId } = request.query;
  console.log(request);
  const shifts = await db.sql<
    s.shift.SQL | s.payPeriod.SQL,
    s.shift.Selectable[]
  >`
    SELECT * FROM ${"shift"}
    WHERE ${"shift"}.${"payPeriodId"} = ${db.param(payPeriodId)}
    `.run(pool);
  response.send(shifts);
});

shiftRouter.put("/", async (request, _response, _next) => {
  console.log(request.body);
});

export default shiftRouter;
