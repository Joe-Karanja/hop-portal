import { Component, Input } from "@angular/core";
// import {
//   EXAMPLE_COMPONENTS,
//   LiveExample
// } from "../../../../../material-examples";

import { ComponentPortal } from "@angular/cdk/portal";
import { CopierService } from "../copier/copier.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-example-viewer",
  templateUrl: "./example-viewer.html",
  styleUrls: ["./example-viewer.scss"]
})
export class ExampleViewerComponent {
  /** Component portal for the currently displayed example. */
  selectedPortal: ComponentPortal<any>;

  /** String key of the currently displayed example. */
  exampleR: string;

  //exampleData: LiveExample;

  /** Whether the source for the example is being displayed. */
  showSource = false;

  constructor(private snackbar: MatSnackBar, private copier: CopierService) {}

  get example() {
    return this.exampleR;
  }

  @Input()
  set example(example: string) {
    // if (example && EXAMPLE_COMPONENTS[example]) {
    //   this.exampleR = example;
    //   this.exampleData = EXAMPLE_COMPONENTS[example];
    //   this.selectedPortal = new ComponentPortal(this.exampleData.component);
    // } else {
    //   //console.log("MISSING EXAMPLE: ", example);
    // }
  }

  toggleSourceView(): void {
    this.showSource = !this.showSource;
  }

  exampleFileUrl(extension: string) {
    return `/assets/examples/${
      this.example
    }-example-${extension.toLowerCase()}.html`;
  }

  copySource(text: string) {
    if (this.copier.copyText(text)) {
      this.snackbar.open("Code copied", "", { duration: 2500 });
    } else {
      this.snackbar.open("Copy failed. Please try again!", "", {
        duration: 2500
      });
    }
  }
}
