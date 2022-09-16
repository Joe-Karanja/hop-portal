import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProductsComponent } from './pages/my-products/my-products.component'
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { AllProductsComponent } from './pages/all-products/all-products.component';

import { SingleCategoryComponent } from './pages/single-category/single-category.component';

const routes: Routes = [
    {
        path: 'my-products',
        component: MyProductsComponent
    },
    {
        path: 'single-product/:id',
        component: SingleProductComponent
    },
    {
        path: 'category/:name',
        component: SingleCategoryComponent
    },
    {
        path: 'add-product',
        component: AddProductComponent
    },
    {
        path: 'all',
        component: AllProductsComponent
    },
    { path: '', redirectTo: 'my-products', pathMatch: 'full' },
    { path: '**', redirectTo: 'error/404', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ProductsRoutingModule {}