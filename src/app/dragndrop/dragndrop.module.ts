import { CommonModule } from "@angular/common";
import { DragndropComponent } from "./dragndrop.component";
import { DragndropRoutes } from "./dragndrop.routing";
import { DragulaModule } from "ng2-dragula";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DragndropRoutes),
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    FlexLayoutModule,
    DragulaModule.forRoot()
  ],
  declarations: [DragndropComponent]
})
export class DragndropModule {}
