import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products.routing';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { SharedModule } from '../shared/shared.module';

import { QuillModule } from 'ngx-quill';
import { AllProductsComponent } from './pages/all-products/all-products.component';
import { ProductCardComponent } from './molecules/product-card/product-card.component';
import { ProductListComponent } from './organisms/product-list/product-list.component';
import { ProductCategoriesComponent } from './organisms/product-categories/product-categories.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';

@NgModule({
  declarations: [
    MyProductsComponent,
    AddProductComponent,
    SingleProductComponent,
    AllProductsComponent,
    ProductCardComponent,
    ProductListComponent,
    ProductCategoriesComponent,
    SingleCategoryComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    QuillModule.forRoot()
  ]
})
export class ProductsModule { }
