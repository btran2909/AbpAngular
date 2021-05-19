import type { GetcustomersInput, customerCreateDto, customerDto, customerUpdateDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class customerService {
  apiName = 'Default';

  create = (input: customerCreateDto) =>
    this.restService.request<any, customerDto>({
      method: 'POST',
      url: '/api/app/customers',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/customers/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, customerDto>({
      method: 'GET',
      url: `/api/app/customers/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetcustomersInput) =>
    this.restService.request<any, PagedResultDto<customerDto>>({
      method: 'GET',
      url: '/api/app/customers',
      params: { filterText: input.filterText, licenseNo: input.licenseNo, licenseExpiredMin: input.licenseExpiredMin, licenseExpiredMax: input.licenseExpiredMax, address: input.address, city: input.city, zipCode: input.zipCode, country: input.country, email: input.email, website: input.website, telephone: input.telephone, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: customerUpdateDto) =>
    this.restService.request<any, customerDto>({
      method: 'PUT',
      url: `/api/app/customers/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
