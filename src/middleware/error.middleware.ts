import type { ErrorRequestHandler, Response } from "express";
import { ZodError } from "zod";
import { AppError, type TErrorDetail } from "../utils/app-error";

type TErrorWithCode = {
  code?: string;
  constraint?: string;
  type?: string;
};

const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: TErrorDetail[],
) => {
  const body: {
    success: false;
    message: string;
    errors?: TErrorDetail[];
  } = {
    success: false,
    message,
  };

  if (errors && errors.length > 0) {
    body.errors = errors;
  }

  return res.status(statusCode).json(body);
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message, err.errors);
  }

  if (err instanceof ZodError) {
    return sendError(
      res,
      400,
      "Validation Error",
      err.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message,
      })),
    );
  }

  const error = err as TErrorWithCode;

  if (error.code === "23505") {
    return sendError(res, 409, "Email already registered");
  }

  if (error.code === "23503") {
    return sendError(res, 400, "Invalid reference");
  }

  if (
    error.code === "23502" ||
    error.code === "23514" ||
    error.code?.startsWith("22")
  ) {
    return sendError(res, 400, "Invalid data");
  }

  if (error.type === "entity.parse.failed") {
    return sendError(res, 400, "Validation Error", [
      {
        field: "body",
        message:
          "Malformed JSON body. Check for trailing commas, single quotes, or missing braces.",
      },
    ]);
  }

  console.error(`[${req.method} ${req.originalUrl}]`, err);

  return sendError(res, 500, "Internal Server Error");
};

export default globalErrorHandler;
