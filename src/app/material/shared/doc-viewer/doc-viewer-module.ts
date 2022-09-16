import { CommonModule } from "@angular/common";
import { CopierService } from "../copier/copier.service";
import { DocViewerComponent } from "./doc-viewer";
import { ExampleViewerComponent } from "../example-viewer/example-viewer";
import { HeaderLinkComponent } from "./header-link";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgModule } from "@angular/core";
import { PortalModule } from "@angular/cdk/portal";

// ExampleViewer is included in the DocViewerModule because they have a circular dependency.
@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    MatCardModule,
    CommonModule,
    PortalModule
  ],
  providers: [CopierService],
  declarations: [
    DocViewerComponent,
    ExampleViewerComponent,
    HeaderLinkComponent
  ],
  entryComponents: [ExampleViewerComponent, HeaderLinkComponent],
  exports: [DocViewerComponent, ExampleViewerComponent, HeaderLinkComponent]
})
export class DocViewerModule {}
