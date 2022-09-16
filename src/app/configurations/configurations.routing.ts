import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailConfigsComponent } from './email-configs/email-configs.component';
import { SmsConfigsComponent } from './sms-configs/sms-configs.component';
import { BusinessCategoriesComponent } from './business-categories/business-categories.component';

const routes: Routes = [
    {
        path: 'email-templates',
        component: EmailConfigsComponent,
        data: {
            title: 'Email Templates'
        }
    },
    {
        path:  "sms-templates",
        component: SmsConfigsComponent,
        data: {
            title: "SMS Templates"
        }
    },{
        path:  "business-categories",
        component: BusinessCategoriesComponent,
        data: {
            title: "Business Category Settings"
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ConfigurationsRoutingModule { }