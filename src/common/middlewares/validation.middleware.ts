import Joi from "joi";
import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

export const validationMiddleware = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (!error) {
      next();
    } else {
      console.log(error);
      const { details } = error;
      const message: string = details.map((i) => i.message).join(",");

      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ success: false, error: message });
    }
  };
};
