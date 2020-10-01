import { Router } from "express";
import * as db from "../zapatos/src";
import * as s from "../zapatos/schema";
import { pool } from "../server";

// Add sub-routes
const jobRouter = Router();

jobRouter.get("/", async (_request, response, _next) => {
  const jobs = await db.sql<
    s.job.SQL,
    s.job.Selectable[]
  >`SELECT * FROM ${"job"}`.run(pool);
  response.send(jobs);
});

jobRouter.post("/", async (request, response, _next) => {
  const { body } = request;
  console.log(body);
  const newJob = {
    id: body.jobNumber,
    name: body.name,
    hour_type: body.hourType,
  };

  const job = await db.sql<
    s.job.SQL,
    s.job.Selectable[]
  >`INSERT INTO ${"job"} (${db.cols(newJob)})
    VALUES (${db.vals(newJob)})`.run(pool);

  response.send(job);
});

export default jobRouter;
