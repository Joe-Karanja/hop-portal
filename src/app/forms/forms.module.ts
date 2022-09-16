import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CommonModule } from "@angular/common";
import { FileUploadModule } from "ng2-file-upload";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormEditorComponent } from "./form-editor/form-editor.component";
import { FormRoutes } from "./forms.routing";
import { FormUploadComponent } from "./form-upload/form-upload.component";
import { FormValidationComponent } from "./form-validation/form-validation.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRadioModule } from "@angular/material/radio";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgModule } from "@angular/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { QuillModule } from "ngx-quill";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FormRoutes),
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    FlexLayoutModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    QuillModule.forRoot()
  ],
  declarations: [
    FormUploadComponent,
    FormValidationComponent,
    FormEditorComponent
  ]
})
export class FormModule {}
