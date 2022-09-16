import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { SchoolPayComponent } from './school-pay/school-pay.component';
import { SingleSchoolPayComponent } from './school-pay/single-school-pay/single-school-pay.component';
import { DashTransComponent } from './dash-trans/dash-trans.component';
import { FailedDashTransactionsComponent } from './failed-dash-transactions/failed-dash-transactions.component';

const routes: Routes = [
    {
        path: 'all-transactions',
        component: AllTransactionsComponent,
        data: {
            title: 'All Transactions'
        }
    },
    {
        path: 'view-transaction/:id',
        component: ViewTransactionComponent,
        data: {
            title: 'View Transaction'
        }
    },
    {
        path: "school-pay-transactions",
        component: SchoolPayComponent,
        data: {
            title: "School Pay Transactions"
        }
    },
    {
        path: "school-pay-transactions/:id",
        component: SingleSchoolPayComponent,
        data: {
            title: "Single School Pay Transaction"
        }
    },
    {
        path: "dashboard-transactions",
        component: DashTransComponent,
        data: {
            title: "Dashboard Transactions"
        }
    },
    {
        path: "dashboard-failed-transactions",
        component: FailedDashTransactionsComponent,
        data: {
            title: "Failed Transactions"
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionsRoutingModule { }