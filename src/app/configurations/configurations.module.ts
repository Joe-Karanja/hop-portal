import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../shared/shared.module';

import { ConfigurationsRoutingModule } from './configurations.routing';
import { EmailConfigsComponent } from './email-configs/email-configs.component';
import { SmsConfigsComponent } from './sms-configs/sms-configs.component';
import { BusinessCategoriesComponent } from './business-categories/business-categories.component';
import { AddTemplateComponent } from './add-template/add-template.component';
import { AddTypesComponent } from './business-categories/add-types/add-types.component';
import { AddSubTypeComponent } from './business-categories/add-sub-type/add-sub-type.component';

import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { AddCategoryComponent } from './product-categories/add-category/add-category.component';
import { AddSubcategoryComponent } from './product-categories/add-subcategory/add-subcategory.component';
import { TenderingSettingsComponent } from './business-settings/tendering-settings/tendering-settings.component';


@NgModule({
  declarations: [
    EmailConfigsComponent,
    SmsConfigsComponent,
    AddTemplateComponent,
    BusinessCategoriesComponent,
    AddTypesComponent,
    AddSubTypeComponent,
    ProductCategoriesComponent,
    AddCategoryComponent,
    AddSubcategoryComponent,
    TenderingSettingsComponent
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    SharedModule,
    QuillModule.forRoot()
  ]
})
export class ConfigurationsModule { }
