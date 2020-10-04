import { Router } from "express";
import * as db from "../zapatos/src";
import * as s from "../zapatos/schema";
import { pool } from "../server";

// Add sub-routes
const shiftRouter = Router();

shiftRouter.get("/", async (request, response, _next) => {
  const { payPeriodId } = request.query;
  const shifts = await db.sql<
    s.shift.SQL | s.payPeriod.SQL,
    s.shift.Selectable[]
  >`SELECT * FROM ${"shift"}
    WHERE ${"shift"}.${"payPeriodId"} = ${db.param(payPeriodId)}
    `.run(pool);
  response.send(shifts);
});

shiftRouter.put("/", async (request, response, _next) => {
  const { payPeriodId, shifts } = request.body;
  await shifts.forEach(async (shift: s.shift.Selectable) => {
    if (shift.id) {
      await db.update("shift", shift, { id: shift.id }).run(pool);
    } else {
      await db
        .insert("shift", { ...shift, id: db.Default, payPeriodId })
        .run(pool);
    }
  });
  response.send();
});

export default shiftRouter;
