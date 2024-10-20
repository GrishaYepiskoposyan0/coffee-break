import { Request, Response } from "express";
import { BadRequestErrorResponse } from "../../common/utils/response.utils";
import * as partnerService from "./partner.service";
import {
  CreatePartnerDto,
  GetAllPartnersDto,
  UpdatePartnerDto,
} from "./partner.dtos";
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

export const updatePartner = async (req: Request, res: Response) => {
  try {
    const updatePartnerDto: UpdatePartnerDto = req.body as UpdatePartnerDto;
    const id: number = +req.params.id;
    const { code, ...data } = await partnerService.updatePartner(
      id,
      updatePartnerDto,
    );
    res.status(code).json(data);
  } catch (e) {
    return BadRequestErrorResponse(res, "Error during updating partner!", e);
  }
};

export const deletePartner = async (req: Request, res: Response) => {
  try {
    const id: number = +req.params.id;
    const { code, ...data } = await partnerService.deletePartner(id);
    res.status(code).json(data);
  } catch (e) {
    return BadRequestErrorResponse(res, "Error during deleting partner!", e);
  }
};

export const getAllPartners = async (req: Request, res: Response) => {
  try {
    const getAllPartnersDto: GetAllPartnersDto = req.query as GetAllPartnersDto;
    const { code, ...data } =
      await partnerService.getAllPartners(getAllPartnersDto);
    res.status(code).json(data);
  } catch (e) {
    return BadRequestErrorResponse(
      res,
      "Error during getting all partners!",
      e,
    );
  }
};

export const getPartnerById = async (req: Request, res: Response) => {
  try {
    const id: number = +req.params.id;
    const { code, ...data } = await partnerService.getPartnerById(id);
    res.status(code).json(data);
  } catch (e) {
    return BadRequestErrorResponse(
      res,
      "Error during getting partner by id!",
      e,
    );
  }
};
