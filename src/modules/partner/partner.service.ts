import { CreatePartnerDto } from "./partner.dtos";
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
