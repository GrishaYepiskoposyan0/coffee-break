import {
  CreatePartnerDto,
  GetAllPartnersDto,
  UpdatePartnerDto,
} from "./partner.dtos";
import { StatusCodes } from "http-status-codes";
import { prismaClient } from "../../common/db/prisma/prisma.client";
import { ErrorResponseDto } from "../../common/dtos/error-response.dto";
import { BaseResponseDto } from "../../common/dtos/base-response.dto";

export const createPartner = async (
  createPartnerDto: CreatePartnerDto,
): Promise<BaseResponseDto | ErrorResponseDto> => {
  const partner = await prismaClient.partner.findFirst({
    where: {
      OR: [{ tin: createPartnerDto.tin }, { name: createPartnerDto.name }],
    },
  });
  if (partner && partner.isActive) {
    return {
      success: false,
      code: StatusCodes.FORBIDDEN,
      message: "Partner already exists!",
    };
  }
  const newPartner = await prismaClient.partner.create({
    data: {
      name: createPartnerDto.name,
      cooperationType: createPartnerDto.cooperationType,
      tin: createPartnerDto.tin,
      isActive: true,
    },
  });
  return {
    success: true,
    code: StatusCodes.CREATED,
    data: newPartner,
  };
};

export const getAllPartners = async (
  getAllPartnersDto: GetAllPartnersDto,
): Promise<BaseResponseDto | ErrorResponseDto> => {
  const partners = await prismaClient.partner.findMany({
    where: {
      isActive:
        getAllPartnersDto.isActive !== undefined
          ? getAllPartnersDto.isActive.toString() === "true"
          : undefined,
    },
    skip:
      getAllPartnersDto.offset !== undefined
        ? +getAllPartnersDto.offset
        : undefined,
    take:
      getAllPartnersDto.limit !== undefined
        ? +getAllPartnersDto.limit
        : undefined,
    include: {
      branches: true,
    },
  });

  return {
    success: true,
    code: StatusCodes.CREATED,
    data: partners,
  };
};
export const getPartnerById = async (
  id: number,
): Promise<BaseResponseDto | ErrorResponseDto> => {
  const partner = await prismaClient.partner.findFirst({
    where: {
      id,
    },
    include: {
      branches: true,
    },
  });

  if (!partner) {
    return {
      success: false,
      code: StatusCodes.NOT_FOUND,
      message: "Partner not found!",
    };
  }
  return {
    success: true,
    code: StatusCodes.CREATED,
    data: partner,
  };
};

export const updatePartner = async (
  id: number,
  updatePartnerDto: UpdatePartnerDto,
): Promise<BaseResponseDto | ErrorResponseDto> => {
  const partner = await prismaClient.partner.findFirst({
    where: {
      id,
    },
  });
  if (!partner) {
    return {
      success: false,
      code: StatusCodes.NOT_FOUND,
      message: "Partner not found!",
    };
  }
  const updatedPartner = await prismaClient.partner.update({
    where: {
      id,
    },
    data: updatePartnerDto,
  });
  return {
    success: true,
    code: StatusCodes.CREATED,
    data: updatedPartner,
  };
};

export const deletePartner = async (
  id: number,
): Promise<BaseResponseDto | ErrorResponseDto> => {
  const partner = await prismaClient.partner.findFirst({
    where: {
      id,
    },
  });
  if (!partner) {
    return {
      success: false,
      code: StatusCodes.NOT_FOUND,
      message: "Partner not found!",
    };
  }
  if (!partner.isActive) {
    return {
      success: false,
      code: StatusCodes.FORBIDDEN,
      message: "Partner is already inactive!",
    };
  }
  await prismaClient.$transaction([
    prismaClient.partner.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    }),
    prismaClient.branch.updateMany({
      where: {
        partnerId: id,
      },
      data: {
        isActive: false,
      },
    }),
  ]);
  return {
    success: true,
    code: StatusCodes.CREATED,
  };
};
