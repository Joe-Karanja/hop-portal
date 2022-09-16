import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ReportsRoutingModule } from './reports.routing';
import { ZamtelComponent } from './zamtel/zamtel.component';
import { ViewZamTransactionComponent } from './zamtel/view-zam-transaction/view-zam-transaction.component';
import { ZiamisComponent } from './ziamis/ziamis.component';
import { ViewSingleTransactionComponent } from './ziamis/view-single-transaction/view-single-transaction.component';



@NgModule({
  declarations: [
    ZamtelComponent,
    ViewZamTransactionComponent,
    ZiamisComponent,
    ViewSingleTransactionComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ]
})
export class ReportsModule { }
