import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentsRoutingModule } from './payments.routing';
import { SharedModule } from '../shared/shared.module';
import { SupplierOrdersComponent } from './supplier-orders/supplier-orders.component';

@NgModule({
  declarations: [
    InvoiceComponent,
    SupplierOrdersComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    SharedModule
  ]
})
export class PaymentsModule { }
