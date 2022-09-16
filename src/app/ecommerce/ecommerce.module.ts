import { CommonModule } from "@angular/common";
import { EcommerceRoutes } from "./ecommerce.routing";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgModule } from "@angular/core";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductsCompactComponent } from "./products-compact/products-compact.component";
import { ProductsComponent } from "./products/products.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EcommerceRoutes),
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSidenavModule,
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [
    ProductsComponent,
    ProductsCompactComponent,
    ProductDetailComponent
  ]
})
export class EcommerceModule {}
