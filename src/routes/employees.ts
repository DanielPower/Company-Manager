import { Router } from "express";
import * as db from "../zapatos/src";
import * as s from "../zapatos/schema";
import { pool } from "../server";
import bcrypt from "bcrypt";

// Add sub-routes
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
    SELECT ${"id"}, ${"name"}, ${"is_admin"}, ${"start_date"}
    FROM ${"employee"}
    WHERE ${"id"} = ${db.param((request.user as s.employee.Selectable).id)}
    LIMIT 1`.run(pool);
  response.json(employee);
});

employeeRouter.post("/", async (request, response, _next) => {
  const { body } = request;
  const passwordHash = await bcrypt.hash("changeme", 10);

  const newEmployee = {
    id: body.id,
    name: body.name,
    password_hash: passwordHash,
    is_admin: body.isAdmin,
    start_date: body.startDate,
  };
  const employee = await db.sql<
    s.employee.SQL,
    s.employee.Selectable
  >`INSERT INTO ${"employee"} (${db.cols(newEmployee)})
    VALUES (${db.vals(newEmployee)})`.run(pool);

  response.send(employee);
});

export default employeeRouter;
