import { CommonModule } from "@angular/common";
import { ComponentViewerModule } from "./pages/component-viewer/component-viewer";
import { MatNativeDateModule } from "@angular/material/core";
import { MaterialRoutes } from "./material.routing";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MatNativeDateModule,
    ComponentViewerModule
  ]
})
export class MaterialComponentsModule {}
