import type { Response } from "express";

type TSuccessBody<T> = {
  statusCode: number;
  message: string;
  data: T;
};

const responseHandler = <T>(res: Response, body: TSuccessBody<T>) =>
  res.status(body.statusCode).json({
    success: true,
    message: body.message,
    data: body.data,
  });

export default responseHandler;
