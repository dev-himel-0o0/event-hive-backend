import cookieParser from "cookie-parser";
import cors from "cors";
import type { Express, Request, Response } from "express";
import express from "express";

const app: Express = express();

const corsOptions = {
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (_req: Request, res: Response) => {
  res.send("Home");
});

export default app;
