import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZamtelComponent } from './zamtel/zamtel.component';
import { ViewZamTransactionComponent } from './zamtel/view-zam-transaction/view-zam-transaction.component';
import { ZiamisComponent } from './ziamis/ziamis.component';
import { ViewSingleTransactionComponent } from './ziamis/view-single-transaction/view-single-transaction.component';

const routes: Routes = [
    {
        path: "zamtel-transactions",
        component: ZamtelComponent,
        data: {
            title: "Zamtel Transactions"
        }
    },
    {
        path: "view-zamtel-transaction/:id",
        component: ViewZamTransactionComponent,
        data: {
            title: "View Zamtel Transaction"
        }
    },
    {
        path: "ziamis-transactions",
        component: ZiamisComponent,
        data: {
            title: "Ziamis Transactions"
        }
    },
    {
        path: "view-ziamis-transaction/:id",
        component: ViewSingleTransactionComponent,
        data: {
            title: "View Ziamis Transaction"
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReportsRoutingModule { }