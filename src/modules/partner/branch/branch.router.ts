import { Router } from "express";
import * as branchController from "./branch.controller";
import {
  queryValidationMiddleware,
  validationMiddleware,
} from "../../../common/middlewares/validation.middleware";
import * as branchValidationSchemas from "./branch.validation-schemas";
import { getAllBranchQueryValidationSchema } from "./branch.validation-schemas";
export const branchRouter: Router = Router();

branchRouter.post(
  "/",
  validationMiddleware(
    branchValidationSchemas.createBranchBodyValidationSchema,
  ),
  branchController.createBranch,
);

branchRouter.put(
  "/:id",
  validationMiddleware(
    branchValidationSchemas.updateBranchBodyValidationSchema,
  ),
  branchController.updateBranch,
);

branchRouter.delete("/:id", branchController.deleteBranch);
branchRouter.get(
  "/:partnerId",
  queryValidationMiddleware(
    branchValidationSchemas.getAllBranchQueryValidationSchema,
  ),
  branchController.getAllBranches,
);
branchRouter.get("/:id", branchController.getBranchById);
