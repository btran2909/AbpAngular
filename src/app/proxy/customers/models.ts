import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetcustomersInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  licenseNo?: string;
  licenseExpiredMin?: string;
  licenseExpiredMax?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  email?: string;
  website?: string;
  telephone?: string;
}

export interface customerCreateDto {
  licenseNo?: string;
  licenseExpired?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  email?: string;
  website?: string;
  telephone?: string;
}

export interface customerDto extends FullAuditedEntityDto<string> {
  licenseNo?: string;
  licenseExpired?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  email?: string;
  website?: string;
  telephone?: string;
}

export interface customerUpdateDto {
  licenseNo?: string;
  licenseExpired?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  email?: string;
  website?: string;
  telephone?: string;
}
