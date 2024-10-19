import { StatusCodes } from "http-status-codes";
import { Response } from "express";
export const BadRequestErrorResponse = (res: Response, ...logParams: any[]) => {
  if (logParams.length) {
    console.log("******************************");
    console.log(...logParams);
    console.log("******************************");
  }
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
  });
};
