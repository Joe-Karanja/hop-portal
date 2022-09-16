import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing';
import { SharedModule } from '../shared/shared.module';

import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { SchoolPayComponent } from './school-pay/school-pay.component';
import { SingleSchoolPayComponent } from './school-pay/single-school-pay/single-school-pay.component';
import { DashTransComponent } from './dash-trans/dash-trans.component';
import { FailedDashTransactionsComponent } from './failed-dash-transactions/failed-dash-transactions.component';


@NgModule({
  declarations: [
    AllTransactionsComponent,
    ViewTransactionComponent,
    SchoolPayComponent,
    SingleSchoolPayComponent,
    DashTransComponent,
    FailedDashTransactionsComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SharedModule
  ]
})
export class TransactionsModule { }
