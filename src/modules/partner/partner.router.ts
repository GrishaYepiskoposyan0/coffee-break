import { Router } from "express";
import * as partnerController from "./partner.controller";
import * as partnerValidationSchemas from "./partner.validation-schemas";
import {
  queryValidationMiddleware,
  validationMiddleware,
} from "../../common/middlewares/validation.middleware";
import {
  deletePartner,
  getAllPartners,
  getPartnerById,
} from "./partner.service";
export const partnerRouter: Router = Router();

partnerRouter.post(
  "/",
  validationMiddleware(
    partnerValidationSchemas.createPartnerBodyValidationSchema,
  ),
  partnerController.createPartner,
);

partnerRouter.put(
  "/:id",
  validationMiddleware(
    partnerValidationSchemas.updatePartnerBodyValidationSchema,
  ),
  partnerController.updatePartner,
);

partnerRouter.delete("/:id", partnerController.deletePartner);
partnerRouter.get(
  "/",
  queryValidationMiddleware(
    partnerValidationSchemas.getAllPartnersQueryValidationSchema,
  ),
  partnerController.getAllPartners,
);
partnerRouter.get("/:id", partnerController.getPartnerById);
