import type { Request, Response } from "express";
import responseHandler from "../../utils/response-handler";
import type { ISignupPayload } from "./auth.interface";
import authService from "./auth.service";

const signup = async (req: Request, res: Response) => {
  const user = await authService.signup(req.body as ISignupPayload);

  return responseHandler(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: user,
  });
};

const authController = {
  signup,
};

export default authController;
