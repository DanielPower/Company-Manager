import { Router } from "express";
import * as db from "../zapatos/src";
import { pool } from "../server";
import passport from "../passport_config";

// Add sub-routes
const authorizeRouter = Router();
authorizeRouter.post("/", (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).send();
      return res.end();
    }
    req.logIn(user, async (err) => {
      if (err) {
        throw err;
      }
      const employee = await db
        .selectExactlyOne(
          "employee",
          { id: user.id },
          { columns: ["id", "name", "isAdmin", "startDate"] }
        )
        .run(pool);
      res.json(employee);
    });
  })(req, res, next);
});

export default authorizeRouter;
