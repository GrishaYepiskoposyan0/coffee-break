import { Request, Response } from "express";
import { BadRequestErrorResponse } from "../../../common/utils/response.utils";
import * as branchService from "./branch.service";
import {
  CreateBranchDto,
  GetAllBranchesDto,
  UpdateBranchDto,
} from "./branch.dtos";
export const createBranch = async (req: Request, res: Response) => {
  try {
    const createBranchDto: CreateBranchDto = req.body as CreateBranchDto;
    const { code, ...data } = await branchService.createBranch(createBranchDto);
    res.status(code).json(data);
  } catch (e) {
    return BadRequestErrorResponse(res, "Error during creating new branch!", e);
  }
};

export const updateBranch = async (req: Request, res: Response) => {
  try {
    const updateBranchDto: UpdateBranchDto = req.body as UpdateBranchDto;
    const id: number = +req.params.id;
    const { code, ...data } = await branchService.updateBranch(
      id,
      updateBranchDto,
    );
    res.status(code).json(data);
  } catch (e) {
    return BadRequestErrorResponse(res, "Error during updating branch!", e);
  }
};

export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const id: number = +req.params.id;
    const { code, ...data } = await branchService.deleteBranch(id);
    res.status(code).json(data);
  } catch (e) {
    return BadRequestErrorResponse(res, "Error during deleting branch!", e);
  }
};

export const getAllBranches = async (req: Request, res: Response) => {
  try {
    const partnerId = +req.params.partnerId;
    const getAllBranchesDto: GetAllBranchesDto = req.query as GetAllBranchesDto;
    const { code, ...data } = await branchService.getAllBranches(
      partnerId,
      getAllBranchesDto,
    );
    res.status(code).json(data);
  } catch (e) {
    return BadRequestErrorResponse(
      res,
      "Error during getting all branches!",
      e,
    );
  }
};

export const getBranchById = async (req: Request, res: Response) => {
  try {
    const id: number = +req.params.id;
    const { code, ...data } = await branchService.getBranchById(id);
    res.status(code).json(data);
  } catch (e) {
    return BadRequestErrorResponse(
      res,
      "Error during getting branch by id!",
      e,
    );
  }
};
