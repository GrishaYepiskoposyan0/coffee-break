import { StatusCodes } from "http-status-codes";

export interface ErrorResponseDto {
  success: boolean;
  code: StatusCodes;
  message?: string;
}
