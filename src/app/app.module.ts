import {
  AdminLayoutComponent,
  AuthLayoutComponent,
  HeaderComponent,
  LayoutComponent,
  MenuComponent,
  NotificationComponent,
  OptionsComponent,
  SidebarComponent
} from "./core";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from "ng-material-multilevel-menu";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

import { AgmCoreModule } from "@agm/core";
import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";
import { BidiModule } from "@angular/cdk/bidi";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from "@angular/core";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { RouterModule } from "@angular/router";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Ng7MatBreadcrumbModule } from 'ng7-mat-breadcrumb';
import { ToastrModule } from 'ngx-toastr';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { QuillModule } from "ngx-quill";
import { HttpReportingInterceptor } from './shared/interceptors/http-reporting.interceptor';
import { GetNotificationLenComponent } from './core/get-notification-len/get-notification-len.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    NotificationComponent,
    OptionsComponent,
    MenuComponent,
    AdminLayoutComponent,
    LayoutComponent,
    AuthLayoutComponent,
    GetNotificationLenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, { relativeLinkResolution: "legacy" }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LoadingBarRouterModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDialogModule,
    FlexLayoutModule,
    BidiModule,
    AgmCoreModule.forRoot({
      apiKey: "YOUR_API_KEY"
    }),
    PerfectScrollbarModule,
    NgMaterialMultilevelMenuModule,
    Ng7MatBreadcrumbModule,
    ToastrModule.forRoot(),
    NzTableModule,
    NzTransferModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzListModule,
    NzLayoutModule,
    NzGridModule,
    NzDividerModule,
    QuillModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: HttpReportingInterceptor , multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }, MultilevelMenuService
  ],
  bootstrap: [AppComponent] 
})
export class AppModule {}
