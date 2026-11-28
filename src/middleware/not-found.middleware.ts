import type { RequestHandler } from "express";
import { AppError } from "../utils/app-error";

const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new AppError(404, "Route not found"));
};

export default notFoundHandler;
