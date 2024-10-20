export interface CreateBranchDto {
  partnerId: number;
  name: string;
  locationLat: string;
  locationLng: string;
  address: string;
  contacts: CreateBranchContactInformationDto[];
}

export interface CreateBranchContactInformationDto {
  contactType: number;
  value: string;
}

export interface UpdateBranchContactInformationDto {
  id: number;
  contactType: number;
  value: string;
}

export interface UpdateBranchDto
  extends Partial<Omit<CreateBranchDto, "partnerId">> {
  contacts: UpdateBranchContactInformationDto[];
}

export interface GetAllBranchesDto {
  limit?: number;
  offset?: number;
  isActive?: boolean;
}
