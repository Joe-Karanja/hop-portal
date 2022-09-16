import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerRfiComponent } from './seller-rfi/seller-rfi.component';
import { RfiApplicationComponent } from './seller-rfi/rfi-application/rfi-application.component';
import { SellerRfpComponent } from './seller-rfp/seller-rfp.component';
import { SellerRfqComponent } from './seller-rfq/seller-rfq.component' 

const routes: Routes = [
    {
        path: 'supplier-RFI',
        component: SellerRfiComponent
    },
    {
        path: 'apply-RFI',
        component: RfiApplicationComponent
    },
    {
        path: 'supplier-RFQ',
        component: SellerRfqComponent
    },
    {
        path: 'supplier-RFP',
        component: SellerRfpComponent
    },
    { path: '', redirectTo: 'supplier-RFI', pathMatch: 'full' },
    { path: '**', redirectTo: 'error/404', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class SellerTenderingRoutingModule {}