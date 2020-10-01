import { Router } from "express";
import * as db from "../zapatos/src";
import * as s from "../zapatos/schema";
import { pool } from "../server";

// Add sub-routes
const jobRouter = Router();
jobRouter.get("/", async (request, response) => {
  const jobs = await db.sql<s.job.SQL, s.job.Selectable[]>`SELECT ${"name"} FROM ${"job"}`.run(pool);
  response.send(jobs);
});

export default jobRouter;
