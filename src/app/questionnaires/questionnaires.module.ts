import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionnaireRoutingModule } from './questionnaire.routing';
import { CategoriesComponent } from './categories/categories.component';
import { QuestionsComponent } from './questions/questions.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AddCategoryComponent } from './add-category/add-category.component';

import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzButtonModule } from 'ng-zorro-antd/button';



@NgModule({
  declarations: [
    CategoriesComponent,
    QuestionsComponent,
    AddQuestionComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuestionnaireRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzStepsModule,
    NzButtonModule
  ]
})
export class QuestionnairesModule { }
