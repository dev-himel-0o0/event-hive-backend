import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import config from "./config/env";
import globalErrorHandler from "./middleware/error.middleware";
import notFoundHandler from "./middleware/not-found.middleware";
import authRouter from "./modules/auth/auth.route";

const app: Express = express();

app.disable("x-powered-by");
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (_req: Request, res: Response) => {
  res.send("EventHive API");
});

app.use(`${config.apiVersion}/auth`, authRouter);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
