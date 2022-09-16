import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TenderingRoutingModule } from './tendering.routing';

//rfi components
import { RFIComponent } from './rfi/rfi.component';
import { AddRfiComponent } from './rfi/add-rfi/add-rfi.component';
import { SingleRfiComponent } from './rfi/single-rfi/single-rfi.component';

//rfq components
import { RFQComponent } from './rfq/rfq.component';
import { AddRfqComponent } from './rfq/add-rfq/add-rfq.component';
import { SingleRfqComponent } from './rfq/single-rfq/single-rfq.component';

//rfp components
import { RFPComponent } from './rfp/rfp.component';
import { AddRfpComponent } from './rfp/add-rfp/add-rfp.component';
import { SingleRfpComponent } from './rfp/single-rfp/single-rfp.component';
import { SupplierProfileComponent } from './supplier-profile/supplier-profile.component';
import { SupplierProductsComponent } from './supplier-products/supplier-products.component';
import { QuoteApprovalComponent } from './rfq/quote-approval/quote-approval.component';
import { AwardTenderComponent } from './rfp/award-tender/award-tender.component';
import { QuickQuoteComponent } from './quick-quote/quick-quote.component';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';

@NgModule({
  declarations: [
    RFIComponent,
    AddRfiComponent,
    SingleRfiComponent,

    RFQComponent,
    AddRfqComponent,
    SingleRfqComponent,

    RFPComponent,
    AddRfpComponent,
    SingleRfpComponent,
    SupplierProfileComponent,
    SupplierProductsComponent,
    QuoteApprovalComponent,
    AwardTenderComponent,
    QuickQuoteComponent,
    PurchaseOrdersComponent,
  ],
  imports: [
    CommonModule,
    TenderingRoutingModule,
    SharedModule
  ]
})
export class TenderingModule { }
