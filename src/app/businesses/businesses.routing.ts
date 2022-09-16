import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessOverviewComponent } from './business-overview/business-overview.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';

const routes: Routes = [
    {
        path: 'overview',
        component: BusinessOverviewComponent
    },
    {
        path: 'profile/:id',
        component: BusinessProfileComponent 
    },
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: '**', redirectTo: 'error/404', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class BusinessRoutingModule {}