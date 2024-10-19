import { Request, Response } from "express";
import { BadRequestErrorResponse } from "../../common/utils/response.utils";
import * as partnerService from "./partner.service";
import { CreatePartnerDto } from "./partner.dtos";
export const createPartner = async (req: Request, res: Response) => {
  try {
    const createPartnerDto: CreatePartnerDto = req.body as CreatePartnerDto;
    const { code, ...data } =
      await partnerService.createPartner(createPartnerDto);
    res.status(code).json(data);
  } catch (e) {
    return BadRequestErrorResponse(
      res,
      "Error during creating new partner!",
      e,
    );
  }
};
