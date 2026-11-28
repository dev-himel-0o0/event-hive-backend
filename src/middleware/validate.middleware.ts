import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { AppError, type TErrorDetail } from "../utils/app-error";

type TValidationSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

const toErrorDetails = (
  issues: readonly { path: PropertyKey[]; message: string }[],
): TErrorDetail[] =>
  issues.map((issue) => ({
    field: issue.path.join(".") || "body",
    message: issue.message,
  }));

const validate =
  (schemas: TValidationSchemas): RequestHandler =>
  (req, res, next) => {
    const errors: TErrorDetail[] = [];

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);

      if (!result.success) {
        errors.push(...toErrorDetails(result.error.issues));
      } else {
        req.body = result.data;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);

      if (!result.success) {
        errors.push(...toErrorDetails(result.error.issues));
      } else {
        req.params = result.data as typeof req.params;
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);

      if (!result.success) {
        errors.push(...toErrorDetails(result.error.issues));
      } else {
        res.locals.query = result.data;
      }
    }

    if (errors.length > 0) {
      throw new AppError(400, "Validation Error", errors);
    }

    next();
  };

export default validate;
