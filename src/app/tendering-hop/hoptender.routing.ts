import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HopPurchaseOrdersComponent } from './hop-purchase-orders/hop-purchase-orders.component';

import { HopRfiComponent } from './hop-rfi/hop-rfi.component';
import { HopRfpComponent } from './hop-rfp/hop-rfp.component';
import { HopRfqComponent } from './hop-rfq/hop-rfq.component';


const routes: Routes = [
    {
        path: 'hop-RFI',
        component: HopRfiComponent
    },
    {
        path: 'hop-RFQ',
        component: HopRfqComponent
    },
    {
        path: 'hop-RFP',
        component: HopRfpComponent
    },
    {
        path: 'hop-purchase-orders',
        component: HopPurchaseOrdersComponent
    },
    { path: '', redirectTo: 'hop-RFI', pathMatch: 'full' },
    { path: '**', redirectTo: 'error/404', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class HOPTenderingRoutingModule {}