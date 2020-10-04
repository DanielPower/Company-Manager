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
    s.pay_period.SQL | s.employee.SQL,
    s.pay_period.Selectable[]
  >`
    SELECT * FROM ${"pay_period"}
    INNER JOIN ${"employee"}
    ON ${"pay_period"}.${"employee_id"} = ${"employee"}.${"id"}
    WHERE ${"pay_period"}.${"employee_id"} = ${db.param(user.id)}
    AND ${"pay_period"}.${"employee_id"} = ${"employee"}.${"id"}
    ORDER BY ${"pay_period"}.${"date"}
    LIMIT 1
  `.run(pool);

  return response.json(payPeriod);
});

export default payperiodRouter;
