import { Router } from "express";
import * as partnerController from "./partner.controller";
import * as partnerValidationSchemas from "./partner.validation-schemas";
import {
  queryValidationMiddleware,
  validationMiddleware,
} from "../../common/middlewares/validation.middleware";
import { branchRouter } from "./branch/branch.router";
export const partnerRouter: Router = Router();

partnerRouter.use("/branch", branchRouter);

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
