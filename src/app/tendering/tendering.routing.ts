import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

//quick quote
import { QuickQuoteComponent } from './quick-quote/quick-quote.component';

import { SupplierProfileComponent } from './supplier-profile/supplier-profile.component';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';

const routes: Routes = [
    //RFI
    {
        path: 'RFI',
        component: RFIComponent
    },
    {
        path: 'RFI/add-rfi',
        component: AddRfiComponent
    },
    {
        path: 'RFI/:id',
        component: SingleRfiComponent
    },
    //rfq
    {
        path: 'RFQ',
        component: RFQComponent
    },
    {
        path: 'RFQ/add-rfq',
        component: AddRfqComponent
    },
    {
        path: 'RFQ/:id',
        component: SingleRfqComponent
    },
    //rfp
    {
        path: 'RFP',
        component: RFPComponent
    },
    {
        path: 'RFP/add-rfp',
        component: AddRfpComponent
    },
    {
        path: 'RFP/:id',
        component: SingleRfpComponent
    },
    //supplier profile
    {
        path: 'supplier-profile/:id',
        component: SupplierProfileComponent
    },

    //quick quote
    {
        path: 'quick-quote',
        component: QuickQuoteComponent
    },
    {
        path: 'purchase-orders',
        component: PurchaseOrdersComponent
    },
    { path: '', redirectTo: 'RFI', pathMatch: 'full' },
    { path: '**', redirectTo: 'error/404', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class TenderingRoutingModule {}