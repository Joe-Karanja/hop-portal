import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductsCompactComponent } from "./products-compact/products-compact.component";
import { ProductsComponent } from "./products/products.component";
import { Routes } from "@angular/router";

export const EcommerceRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "products",
        component: ProductsComponent
      },
      {
        path: "compact",
        component: ProductsCompactComponent
      },
      {
        path: "detail",
        component: ProductDetailComponent
      }
    ]
  }
];
