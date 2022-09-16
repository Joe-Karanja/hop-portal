import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRfiComponent } from './seller-rfi/seller-rfi.component';
import { SharedModule } from '../shared/shared.module';
import { SellerTenderingRoutingModule } from './seller.routing';
import { RfiApplicationComponent } from './seller-rfi/rfi-application/rfi-application.component';
import { SellerRfpComponent } from './seller-rfp/seller-rfp.component';
import { SellerRfqComponent } from './seller-rfq/seller-rfq.component';


@NgModule({
  declarations: [
    SellerRfiComponent,
    RfiApplicationComponent,
    SellerRfpComponent,
    SellerRfqComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SellerTenderingRoutingModule
  ]
})
export class TenderingSellerModule { }
