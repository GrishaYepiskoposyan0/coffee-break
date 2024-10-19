import { StatusCodes } from "http-status-codes";

export interface BaseResponseDto {
  success: boolean;
  code: StatusCodes;
  data?: any;
}
