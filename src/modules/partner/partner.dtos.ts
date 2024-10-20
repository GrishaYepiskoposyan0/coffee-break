export interface CreatePartnerDto {
  name: string;
  cooperationType: number;
  tin: string;
}

export interface UpdatePartnerDto extends Partial<CreatePartnerDto> {}

export interface GetAllPartnersDto {
  limit?: number;
  offset?: number;
  isActive?: boolean;
}
