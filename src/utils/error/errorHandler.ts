import { NextFunction, Request, Response } from "express";
import { ServerError } from "./ServerError";

export const errorHandler = (
  error: ServerError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ServerError) {
    return res.status(error.code).send({
      message: error.message,
      cause: error?.cause,
    });
  }

  return res.status(500).send({
    message: "Internal server error.",
  });
};
