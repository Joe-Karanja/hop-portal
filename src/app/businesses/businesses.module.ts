import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessOverviewComponent } from './business-overview/business-overview.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { SharedModule } from '../shared/shared.module';
import { NgxExtendedPdfViewerModule  } from 'ngx-extended-pdf-viewer';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusinessRoutingModule } from './businesses.routing';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    BusinessOverviewComponent,
    BusinessProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BusinessRoutingModule,
    NzStepsModule,
    NzButtonModule,
    SharedModule,
    NgxExtendedPdfViewerModule
  ]
})
export class BusinessesModule { }
