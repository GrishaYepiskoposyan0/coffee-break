import { Router } from "express";
import { partnerRouter } from "../modules/partner/partner.router";
export const router = Router();

router.use("/partner", partnerRouter);
