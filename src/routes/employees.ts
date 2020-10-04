import { Router } from "express";
import * as db from "../zapatos/src";
import * as s from "../zapatos/schema";
import { pool } from "../server";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

const employeeRouter = Router();

employeeRouter.get("/", async (_request, response, _next) => {
  const employees = await db.sql<
    s.employee.SQL,
    s.employee.Selectable[]
  >`SELECT * FROM ${"employee"}`.run(pool);
  response.send(employees);
});

employeeRouter.get("/current", async (request, response, _next) => {
  if (!request.user) {
    return response.status(403).send();
  }
  const [employee] = await db.sql<s.employee.SQL, s.employee.Selectable[]>`
    SELECT ${"id"}, ${"name"}, ${"isAdmin"}, ${"startDate"}
    FROM ${"employee"}
    WHERE ${"id"} = ${db.param((request.user as s.employee.Selectable).id)}
    LIMIT 1`.run(pool);
  response.json(employee);
});

employeeRouter.post("/", async (request, response, _next) => {
  const { id, name, isAdmin, startDate } = request.body;
  const passwordHash = await bcrypt.hash("changeme", 10);

  const insertedEmployee = await db.transaction(
    pool,
    db.Isolation.Serializable,
    async (txClient) => {
      const [employee] = await db
        .insert("employee", [
          {
            id,
            name,
            passwordHash,
            isAdmin,
            startDate,
          },
        ])
        .run(txClient);

      await db
        .insert("payPeriod", [
          {
            id: db.Default,
            date: dayjs(employee.startDate).day(0).format("YYYY-MM-DD"),
            employeeId: employee.id,
          },
        ])
        .run(txClient);

      return employee;
    }
  );

  response.send(insertedEmployee);
});

export default employeeRouter;
