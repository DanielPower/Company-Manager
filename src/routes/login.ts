import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import passport from "../passport_config";

// Add sub-routes
const loginRouter = Router();
loginRouter.post("/", passport.authenticate("local"), (req, res) => {
  console.log("it worked");
});

export default loginRouter;
