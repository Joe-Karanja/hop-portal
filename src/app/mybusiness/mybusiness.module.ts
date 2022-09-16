import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { MybusinessRoutingModule } from './mybusiness.routing';
import { GeneralComponent } from './general/general.component';
import { NgxExtendedPdfViewerModule  } from 'ngx-extended-pdf-viewer';
import { ProfileQuestionnairesComponent } from './profile-questionnaires/profile-questionnaires.component';
import { ProfileUsersComponent } from './profile-users/profile-users.component';
import { ProfileDocumentsComponent } from './profile-documents/profile-documents.component';
import { ProfileBasicComponent } from './profile-basic/profile-basic.component';
import { PaymentSettingsComponent } from './payment-settings/payment-settings.component';


@NgModule({
  declarations: [
    GeneralComponent,
    ProfileQuestionnairesComponent,
    ProfileUsersComponent,
    ProfileDocumentsComponent,
    ProfileBasicComponent,
    PaymentSettingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MybusinessRoutingModule,
    NgxExtendedPdfViewerModule
  ]
})
export class MybusinessModule { }
