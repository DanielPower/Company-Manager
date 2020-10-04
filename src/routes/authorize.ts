import { Router } from "express";
import passport from "../passport_config";

// Add sub-routes
const authorizeRouter = Router();
authorizeRouter.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.writeHead(401, { "Content-Type": "application/json" });
      return res.end();
    }
    req.logIn(user, (err) => {
      if (err) {
        throw err;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
    });
    return res.end();
  })(req, res, next);
});

export default authorizeRouter;
