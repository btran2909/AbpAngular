import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-host-dashboard *abpPermission="'AbpAngular.Dashboard.Host'"></app-host-dashboard>
    <app-tenant-dashboard *abpPermission="'AbpAngular.Dashboard.Tenant'"></app-tenant-dashboard>
  `,
})
export class DashboardComponent {}
