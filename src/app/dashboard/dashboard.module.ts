
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutes } from "./dashboard.routing";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ChartsModule } from "ng2-charts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NzIconModule } from 'ng-zorro-antd/icon';




import { SharedModule } from '../shared/shared.module';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { SuccessFailedComponent } from './success-failed/success-failed.component';
import { ValuesTrendComponent } from './values-trend/values-trend.component';
import { TransactionsIntegrationsComponent } from './transactions-integrations/transactions-integrations.component';
import { TransactionsServicesComponent } from './transactions-services/transactions-services.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    ChartsModule,
    NgxDatatableModule,
    FlexLayoutModule,
    SharedModule,
    NzIconModule
  ],
  declarations: [DashboardComponent, CustomerDashboardComponent, SuccessFailedComponent, ValuesTrendComponent, TransactionsIntegrationsComponent, TransactionsServicesComponent]
})
export class DashboardModule {}
