import { BaseResponseDto } from "../../common/dtos/base-response.dto";

export interface CreatePartnerDto {
  name: string;
  cooperationType: number;
  tin: string;
}
