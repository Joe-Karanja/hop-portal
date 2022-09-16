import { Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

export const DashboardRoutes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: "customer-dashboard",
    component: CustomerDashboardComponent,
    data: {
      title: "Customer Dashboard"
    }
  }
];
