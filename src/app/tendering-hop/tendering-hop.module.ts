import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HopRfiComponent } from './hop-rfi/hop-rfi.component';
import { SharedModule } from '../shared/shared.module';
import { HOPTenderingRoutingModule } from './hoptender.routing';
import { HopRfpComponent } from './hop-rfp/hop-rfp.component';
import { HopRfqComponent } from './hop-rfq/hop-rfq.component';
import { HopPurchaseOrdersComponent } from './hop-purchase-orders/hop-purchase-orders.component';


@NgModule({
  declarations: [
    HopRfiComponent,
    HopRfpComponent,
    HopRfqComponent,
    HopPurchaseOrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HOPTenderingRoutingModule
  ]
})
export class TenderingHopModule { }
