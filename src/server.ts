import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import "express-async-errors";

import BaseRouter from "./routes";
import logger from "./logger";
import { Pool } from "pg";

// Init express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Add APIs
app.use("/", BaseRouter);

// Print API errors
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
