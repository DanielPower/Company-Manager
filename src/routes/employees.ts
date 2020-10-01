import { Router } from "express";
import * as db from "../zapatos/src";
import * as s from "../zapatos/schema";
import { pool } from "../server";

// Add sub-routes
const employeeRouter = Router();

employeeRouter.get("/", async (_request, response, _next) => {
  const employees = await db.sql<
    s.employee.SQL,
    s.employee.Selectable[]
  >`SELECT * FROM ${"employee"}`.run(pool);
  response.send(employees);
});

employeeRouter.post("/", async (request, response, _next) => {
  const { body } = request;
  const newEmployee = {
    id: body.id,
    name: body.name,
    password_hash: "500",
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
