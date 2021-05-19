import type { GetcompaniesInput, companyCreateDto, companyDto, companyUpdateDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class companyService {
  apiName = 'Default';

  create = (input: companyCreateDto) =>
    this.restService.request<any, companyDto>({
      method: 'POST',
      url: '/api/app/companies',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/companies/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, companyDto>({
      method: 'GET',
      url: `/api/app/companies/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetcompaniesInput) =>
    this.restService.request<any, PagedResultDto<companyDto>>({
      method: 'GET',
      url: '/api/app/companies',
      params: { filterText: input.filterText, companyName: input.companyName, description: input.description, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: companyUpdateDto) =>
    this.restService.request<any, companyDto>({
      method: 'PUT',
      url: `/api/app/companies/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
