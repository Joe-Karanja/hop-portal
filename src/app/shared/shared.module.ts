import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//angular material
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule} from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

//custom pipes
import { SearchPipe } from './pipes/search.pipe';

//ng-zorro-antd
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule} from 'ng-zorro-antd/card';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { SuccessLabelComponent } from './components/success-label/success-label.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

//components
import { ActiveLabelComponent } from './components/active-label/active-label.component';
import { BlockedLabelComponent } from './components/blocked-label/blocked-label.component';
import { BlockedStatusComponent } from './components/blocked-status/blocked-status.component';
import { EditNotificationLabelComponent } from './components/edit-notification-label/edit-notification-label.component';
import { ActiveStatusLabelComponent } from './components/active-status-label/active-status-label.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [
    SearchPipe,
    SuccessLabelComponent,
    ActiveLabelComponent,
    BlockedLabelComponent,
    BlockedStatusComponent,
    EditNotificationLabelComponent,
    ActiveStatusLabelComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NzAffixModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatPaginatorModule,
    MatListModule,
    MatTabsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTableExporterModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatSliderModule,
    MatSlideToggleModule,
    NzTableModule,
    NzTransferModule,
    NzButtonModule,
    NgxDatatableModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCardModule,
    NzMessageModule,
    NzModalModule,
    NzMenuModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzIconModule,
    NzPaginationModule,
    NzDatePickerModule,
    NzListModule,
    NzGridModule,
    NzDividerModule,
    NzTagModule,
    NzLayoutModule,
    NzSpaceModule,
    MatGridListModule,
    MatRadioModule,
    NzAvatarModule,
    NzCollapseModule,
    NzCarouselModule,
    NzImageModule,
    NzPageHeaderModule,
    NzUploadModule,
    NzTabsModule,
    NzStatisticModule,
    NzStepsModule,
    NzSpinModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NzAffixModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatPaginatorModule,
    MatListModule,
    MatTabsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTableExporterModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatSliderModule,
    MatSlideToggleModule,
    SearchPipe,
    NzTableModule,
    NzTransferModule,
    NzButtonModule,
    NzFormModule,
    NgxDatatableModule,
    NzInputModule,
    NzSelectModule,
    NzCardModule,
    NzMessageModule,
    NzModalModule,
    NzMenuModule,
    NzCheckboxModule,
    NzDropDownModule,
    NzIconModule,
    NzPaginationModule,
    NzDatePickerModule,
    NzListModule,
    NzGridModule,
    NzDividerModule,
    NzTagModule,
    NzLayoutModule,
    NzSpaceModule,
    SuccessLabelComponent,
    ActiveLabelComponent,
    BlockedLabelComponent,
    BlockedStatusComponent,
    EditNotificationLabelComponent,
    ActiveStatusLabelComponent,
    MatGridListModule,
    MatRadioModule,
    NzAvatarModule,
    NzCollapseModule,
    NzCarouselModule,
    NzImageModule,
    NzPageHeaderModule,
    NzUploadModule,
    NzTabsModule,
    NzStatisticModule,
    NzStepsModule,
    NzSpinModule
  ],

  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ]
})
export class SharedModule { }
