import { Request, Response, Router } from "express";
import * as db from "../zapatos/src";
import { StatusCodes } from "http-status-codes";
import { pool } from "../server";

// Init router and path
const router = Router();

// Add sub-routes
router.post("/authenticate", async (req: Request, res: Response) => {
  const firstUser = await db.sql`SELECT * from employee LIMIT 1`.run(pool);
  console.log(firstUser);
  return res.status(StatusCodes.OK).end();
});

// Export the base-router
export default router;
