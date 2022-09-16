import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { QuestionnaireComponent } from './questionnaire.component';
import { CategoriesComponent } from './categories/categories.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
    {
        path: 'overview',
        component: QuestionsComponent
    },
    {
        path: 'categories',
        component: CategoriesComponent
    },
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: '**', redirectTo: 'error/404', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class QuestionnaireRoutingModule {}