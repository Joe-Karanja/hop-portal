import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralComponent } from './general/general.component';
import { ProfileQuestionnairesComponent } from './profile-questionnaires/profile-questionnaires.component';

const routes: Routes = [
    {
        path: 'general',
        component: GeneralComponent
    },
    {
        path: 'questions',
        component: ProfileQuestionnairesComponent
    },
    { path: '', redirectTo: 'general', pathMatch: 'full' },
    { path: '**', redirectTo: 'error/404', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class MybusinessRoutingModule {}