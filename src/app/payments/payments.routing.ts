import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InvoiceComponent } from "./invoice/invoice.component";
import { SupplierOrdersComponent } from "./supplier-orders/supplier-orders.component";



const routes: Routes = [
    {
        path: 'invoices',
        component: InvoiceComponent
    },
    {
        path: 'orders',
        component: SupplierOrdersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PaymentsRoutingModule {}