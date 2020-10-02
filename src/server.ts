import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import expressSession from "express-session";
import { StatusCodes } from "http-status-codes";
import "express-async-errors";

import BaseRouter from "./routes";
import logger from "./logger";
import { Pool } from "pg";
import passport from "./passport_config";

// Init express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: "shush",
    resave: true,
    saveUninitialized: true,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use(passport.initialize());
app.use(passport.session());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("user", req.user);
  next();
});
app.use("/", BaseRouter);
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(StatusCodes.BAD_REQUEST).json({
    error: err.message,
  });
});

const staticDir = path.join(__dirname, "client/public");
app.use(express.static(staticDir));
app.get("*", (_req: Request, res: Response) => {
  res.sendFile("index.html", { root: staticDir });
});

export const pool = new Pool();
pool.connect();

export default app;
