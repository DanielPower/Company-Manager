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
  const user = request.user as s.employee.Selectable;
  if (!request.user) {
    return response.json(null);
  }
  const employee = await db
    .selectExactlyOne(
      "employee",
      {
        id: user.id,
      },
      { columns: ["id", "name", "isAdmin", "startDate"] }
    )
    .run(pool);
  console.log(employee);
  response.json(employee);
});

employeeRouter.post("/", async (request, response, _next) => {
  const { id, name, isAdmin, startDate } = request.body;
  const passwordHash = await bcrypt.hash("changeme", 10);

  const insertedEmployee = await db.transaction(
    pool,
    db.IsolationLevel.Serializable,
    async (txClient) => {
      const [employee] = await db
        .insert(
          "employee",
          [
            {
              id,
              name,
              passwordHash,
              isAdmin,
              startDate,
            },
          ],
          {
            returning: ["id", "name", "isAdmin", "startDate"],
          }
        )
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
