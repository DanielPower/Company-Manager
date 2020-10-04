import * as db from "../zapatos/src";
import * as s from "../zapatos/schema";
import { pool } from "../server";
import { Router } from "express";
import dayjs from "dayjs";

// Add sub-routes
const payperiodRouter = Router();

payperiodRouter.get("/", async (request, response, _next) => {
  const user = request.user as s.employee.Selectable;
  if (!request.user) {
    return response.status(403).send();
  }
  const payPeriod = await db
    .selectExactlyOne("payPeriod", {
      employeeId: user.id,
      isSubmitted: false,
    })
    .run(pool);

  return response.json(payPeriod);
});

payperiodRouter.put("/", async (request, response) => {
  const { payPeriodId: id, isSubmitted } = request.body;
  await db.update("payPeriod", { isSubmitted }, { id }).run(pool);
  const { date, employeeId } = await db
    .selectExactlyOne("payPeriod", { id })
    .run(pool);
  await db
    .insert("payPeriod", {
      id: db.Default,
      date: dayjs(date).add(7, "day").format("YYYY-MM-DD"),
      employeeId,
      isSubmitted: false,
    })
    .run(pool);

  response.send();
});

export default payperiodRouter;
