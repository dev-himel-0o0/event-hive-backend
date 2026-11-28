import type { Router } from "express";
import express from "express";
import validate from "../../middleware/validate.middleware";
import authController from "./auth.controller";
import { signupSchema } from "./auth.validation";

const authRouter: Router = express.Router();

authRouter.post(
  "/signup",
  validate({ body: signupSchema }),
  authController.signup,
);

export default authRouter;
