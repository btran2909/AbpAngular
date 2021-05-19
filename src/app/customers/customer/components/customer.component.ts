import { ABP, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import type {
  GetcustomersInput,
  customerDto,
} from '../../../proxy/customers/models';
import { customerService } from '../../../proxy/customers/customer.service';

@Component({
  selector: 'app-customer',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './customer.component.html',
  styles: [],
})
export class customerComponent implements OnInit {
  data: PagedResultDto<customerDto> = {
    items: [],
    totalCount: 0,
  };

  filters = {} as GetcustomersInput;

  form: FormGroup;

  isFiltersHidden = true;

  isModalBusy = false;

  isModalOpen = false;

  selected?: customerDto;

  constructor(
    public readonly list: ListService,
    public readonly track: TrackByService,
    public readonly service: customerService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const getData = (query: ABP.PageQueryParams) =>
      this.service.getList({
        ...query,
        ...this.filters,
        filterText: query.filter,
      });

    const setData = (list: PagedResultDto<customerDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetcustomersInput;
  }

  buildForm() {
    const {
      licenseNo,
      licenseExpired,
      address,
      city,
      zipCode,
      country,
      email,
      website,
      telephone,
    } = this.selected || {};

    this.form = this.fb.group({
      licenseNo: [licenseNo ?? null, []],
      licenseExpired: [licenseExpired ? new Date(licenseExpired) : null, []],
      address: [address ?? null, []],
      city: [city ?? null, []],
      zipCode: [zipCode ?? null, []],
      country: [country ?? null, []],
      email: [email ?? null, [Validators.email]],
      website: [website ?? null, []],
      telephone: [telephone ?? null, []],
    });
  }

  hideForm() {
    this.isModalOpen = false;
    this.form.reset();
  }

  showForm() {
    this.buildForm();
    this.isModalOpen = true;
  }

  submitForm() {
    if (this.form.invalid) return;

    const request = this.selected
      ? this.service.update(this.selected.id, this.form.value)
      : this.service.create(this.form.value);

    this.isModalBusy = true;

    request
      .pipe(
        finalize(() => (this.isModalBusy = false)),
        tap(() => this.hideForm()),
      )
      .subscribe(this.list.get);
  }

  create() {
    this.selected = undefined;
    this.showForm();
  }

  update(record: customerDto) {
    this.selected = record;
    this.showForm();
  }

  delete(record: customerDto) {
    this.confirmation.warn(
      '::DeleteConfirmationMessage',
      '::AreYouSure',
      { messageLocalizationParams: [] }
    ).pipe(
      filter(status => status === Confirmation.Status.confirm),
      switchMap(() => this.service.delete(record.id)),
    ).subscribe(this.list.get);
  }
}
