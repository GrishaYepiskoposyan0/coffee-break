import { Router } from "express";
import * as partnerController from "./partner.controller";
import * as partnerValidationSchemas from "./partner.validation-schemas";
import { validationMiddleware } from "../../common/middlewares/validation.middleware";
export const partnerRouter: Router = Router();

partnerRouter.post(
  "/",
  validationMiddleware(partnerValidationSchemas.createPartnerValidationSchema),
  partnerController.createPartner,
);
