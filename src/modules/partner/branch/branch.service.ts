import {
  CreateBranchDto,
  GetAllBranchesDto,
  UpdateBranchDto,
} from "./branch.dtos";
import { StatusCodes } from "http-status-codes";
import { prismaClient } from "../../../common/db/prisma/prisma.client";
import { ErrorResponseDto } from "../../../common/dtos/error-response.dto";
import { BaseResponseDto } from "../../../common/dtos/base-response.dto";

export const createBranch = async (
  createBranchDto: CreateBranchDto,
): Promise<BaseResponseDto | ErrorResponseDto> => {
  const partner = await prismaClient.partner.findFirst({
    where: { id: createBranchDto.partnerId },
  });
  if (!partner || !partner.isActive) {
    return {
      success: false,
      code: StatusCodes.NOT_FOUND,
      message: "Partner is inactive or not found!",
    };
  }
  const branch = await prismaClient.branch.findFirst({
    where: {
      AND: [
        { partnerId: createBranchDto.partnerId },
        { name: createBranchDto.name },
      ],
    },
  });
  if (branch && branch.isActive) {
    return {
      success: false,
      code: StatusCodes.FORBIDDEN,
      message: "Branch already exists!",
    };
  }

  const newBranch = await prismaClient.branch.create({
    data: {
      partner: { connect: { id: createBranchDto.partnerId } },
      name: createBranchDto.name,
      locationLng: createBranchDto.locationLng,
      locationLat: createBranchDto.locationLat,
      contacts: {
        create: createBranchDto.contacts,
      },
      address: createBranchDto.address,
      isActive: true,
    },
    include: {
      contacts: true,
    },
  });
  return {
    success: true,
    code: StatusCodes.CREATED,
    data: newBranch,
  };
};

export const getAllBranches = async (
  partnerId: number,
  getAllBranchesDto: GetAllBranchesDto,
): Promise<BaseResponseDto | ErrorResponseDto> => {
  const branches = await prismaClient.branch.findMany({
    where: {
      isActive:
        getAllBranchesDto.isActive !== undefined
          ? getAllBranchesDto.isActive.toString() === "true"
          : undefined,
      partnerId,
    },
    skip:
      getAllBranchesDto.offset !== undefined
        ? +getAllBranchesDto.offset
        : undefined,
    take:
      getAllBranchesDto.limit !== undefined
        ? +getAllBranchesDto.limit
        : undefined,
  });

  return {
    success: true,
    code: StatusCodes.CREATED,
    data: branches,
  };
};
export const getBranchById = async (
  id: number,
): Promise<BaseResponseDto | ErrorResponseDto> => {
  const branch = await prismaClient.branch.findFirst({
    where: {
      id,
    },
  });

  if (!branch) {
    return {
      success: false,
      code: StatusCodes.NOT_FOUND,
      message: "Branch not found!",
    };
  }
  return {
    success: true,
    code: StatusCodes.CREATED,
    data: branch,
  };
};

export const updateBranch = async (
  id: number,
  updateBranchDto: UpdateBranchDto,
): Promise<BaseResponseDto | ErrorResponseDto> => {
  const branch = await prismaClient.branch.findFirst({
    where: {
      id,
    },
  });
  if (!branch) {
    return {
      success: false,
      code: StatusCodes.NOT_FOUND,
      message: "Branch not found!",
    };
  }

  const updatedBranch = await prismaClient.branch.update({
    where: {
      id,
    },
    data: {
      name: updateBranchDto.name,
      locationLat: updateBranchDto.locationLat,
      locationLng: updateBranchDto.locationLng,
      address: updateBranchDto.address,
      contacts: {
        /// TODO: handle update contacts
        upsert: updateBranchDto.contacts?.map((contact) => {
          const { id, ...data } = contact;
          return {
            where: {
              id: id,
            },
            update: data,
            create: data,
          };
        }),
      },
    },
    include: {
      contacts: true,
    },
  });
  return {
    success: true,
    code: StatusCodes.CREATED,
    data: updatedBranch,
  };
};

export const deleteBranch = async (
  id: number,
): Promise<BaseResponseDto | ErrorResponseDto> => {
  const branch = await prismaClient.branch.findFirst({
    where: {
      id,
    },
  });
  if (!branch) {
    return {
      success: false,
      code: StatusCodes.NOT_FOUND,
      message: "Branch not found!",
    };
  }
  if (!branch.isActive) {
    return {
      success: false,
      code: StatusCodes.FORBIDDEN,
      message: "Branch is already inactive!",
    };
  }
  const updatedBranch = await prismaClient.branch.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
    include: {
      contacts: true,
    },
  });
  return {
    success: true,
    code: StatusCodes.CREATED,
    data: updatedBranch,
  };
};
