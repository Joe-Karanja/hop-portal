import { AdminLayoutComponent, AuthLayoutComponent } from "./core";

import { Routes } from "@angular/router";

import { AuthGuard } from './auth/auth.guard';

export const AppRoutes: Routes = [
  
  {
    path: "",
    component: AdminLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      ////HOP ADMIN
      {
        path: "",
        loadChildren: () =>
          // import("./dashboard/dashboard.module").then(m => m.DashboardModule)
          import("./chartlib/chartlib.module").then(m => m.ChartlibModule)
      },
      {
        path: "companies",
        loadChildren: () => 
          import("./businesses/businesses.module").then(m => m.BusinessesModule)
      },
      {
        path: "questionnaires",
        loadChildren: () => 
          import("./questionnaires/questionnaires.module").then(m => m.QuestionnairesModule)
      },
      {
        path: "tendering-hop",
        loadChildren: () => 
          import("./tendering-hop/tendering-hop.module").then(m => m.TenderingHopModule)
      },
      {
        path: "users",
        loadChildren: () => 
          import("./users/users.module").then(m => m.UsersModule)
      },
      {
        path: 'rbac',
        loadChildren: () =>
          import("./rbac/rbac.module").then(m => m.RbacModule)
      },
      {
        path: "configurations",
        loadChildren: () => 
          import("./configurations/configurations.module").then(m => m.ConfigurationsModule)
      },
      //Sellers
      {
        path: "tendering-seller",
        loadChildren: () => 
          import("./tendering-seller/tendering-seller.module").then(m => m.TenderingSellerModule)
      },
      {
        path: "products",
        loadChildren: () => 
          import("./products/products.module").then(m => m.ProductsModule)
      },
      {
        path: "my-company",
        loadChildren: () => 
          import("./mybusiness/mybusiness.module").then(m => m.MybusinessModule)
      },
      //buyers
      {
        path: "tendering",
        loadChildren: () => 
          import("./tendering/tendering.module").then(m => m.TenderingModule)
      },
      {
        path: "payments",
        loadChildren: () => 
          import("./payments/payments.module").then(m => m.PaymentsModule)
      },
      {
        path: "widgets",
        loadChildren: () =>
          import("./widgets/widgets.module").then(m => m.WidgetsModule)
      },
      {
        path: "material",
        loadChildren: () =>
          import("./material/material.module").then(
            m => m.MaterialComponentsModule
          )
      },
      // {
      //   path: "transactions", 
      //   loadChildren: () => 
      //     import("./transactions/transactions.module").then(m => m.TransactionsModule)
      // },
      // {
      //   path: "reports",
      //   loadChildren: () => 
      //     import("./reports/reports.module").then(m => m.ReportsModule)
      // },
      {
        path: "workflow",
        loadChildren: () => 
          import("./workflow/workflow.module").then(m => m.WorkflowModule)
      },
      {
        path: "ecommerce",
        loadChildren: () =>
          import("./ecommerce/ecommerce.module").then(m => m.EcommerceModule)
      },
      {
        path: "taskboard",
        loadChildren: () =>
          import("./taskboard/taskboard.module").then(m => m.TaskboardModule)
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./forms/forms.module").then(m => m.FormModule)
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./tables/tables.module").then(m => m.TablesModule)
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./chartlib/chartlib.module").then(m => m.ChartlibModule)
      },
      {
        path: "maps",
        loadChildren: () => import("./maps/maps.module").then(m => m.MapModule)
      },
      {
        path: "dragndrop",
        loadChildren: () =>
          import("./dragndrop/dragndrop.module").then(m => m.DragndropModule)
      },
      {
        path: "pages",
        loadChildren: () =>
          import("./pages/pages.module").then(m => m.PagesModule)
      },
      {
        path: "apps",
        loadChildren: () => import("./apps/apps.module").then(m => m.AppsModule)
      },
    ],
  },
  {
    path: "auth",
    loadChildren: () => 
      import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "session",
        loadChildren: () =>
          import("./session/session.module").then(m => m.SessionModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "session/404"
  }
];
