import { CommonModule } from "@angular/common";
import { DragulaModule } from "ng2-dragula";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TaskboardComponent } from "./taskboard.component";
import { TaskboardRoutes } from "./taskboard.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TaskboardRoutes),
    DragulaModule.forRoot()
  ],
  declarations: [TaskboardComponent]
})
export class TaskboardModule {}
