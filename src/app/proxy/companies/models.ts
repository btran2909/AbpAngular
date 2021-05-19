import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetcompaniesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  companyName?: string;
  description?: string;
}

export interface companyCreateDto {
  companyName: string;
  description?: string;
}

export interface companyDto extends FullAuditedEntityDto<string> {
  companyName: string;
  description?: string;
}

export interface companyUpdateDto {
  companyName: string;
  description?: string;
}
