import * as db from "../zapatos/src";
import * as s from "../zapatos/schema";
import { pool } from "../server";
import { Router } from "express";

// Add sub-routes
const payperiodRouter = Router();

payperiodRouter.get("/", async (request, response, _next) => {
  const user = request.user as s.employee.Selectable;
  console.log(request.user);
  if (!request.user) {
    return response.status(403).send();
  }
  const [payPeriod] = await db.sql<
    s.payPeriod.SQL | s.employee.SQL,
    s.payPeriod.Selectable[]
  >`
    SELECT ${"payPeriod"}.* FROM ${"payPeriod"}
    INNER JOIN ${"employee"}
    ON ${"payPeriod"}.${"employeeId"} = ${"employee"}.${"id"}
    WHERE ${"payPeriod"}.${"employeeId"} = ${db.param(user.id)}
    AND ${"payPeriod"}.${"employeeId"} = ${"employee"}.${"id"}
    ORDER BY ${"payPeriod"}.${"date"}
    LIMIT 1
  `.run(pool);

  return response.json(payPeriod);
});

export default payperiodRouter;
