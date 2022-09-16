import { ActivatedRoute, Params, Router, RouterModule } from "@angular/router";
import {
  Component,
  ElementRef,
  NgModule,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {
  DocItem,
  DocumentationItems
} from "../../shared/documentation-items/documentation-items";
import { Subject, combineLatest } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

import { CommonModule } from "@angular/common";
import { DocViewerModule } from "../../shared/doc-viewer/doc-viewer-module";

@Component({
  selector: "app-component-viewer",
  templateUrl: "./component-viewer.html",
  encapsulation: ViewEncapsulation.None
})
export class ComponentViewerComponent implements OnDestroy {
  componentDocItem: DocItem;
  sections: Set<string> = new Set(["overview", "api"]);
  private destroyed = new Subject();

  constructor(
    route: ActivatedRoute,
    private router: Router,
    public docItems: DocumentationItems
  ) {
    // Listen to changes on the current route for the doc id (e.g. button/checkbox) and the
    // parent route for the section (material/cdk).
    combineLatest([route.params, route.parent.params])
      .pipe(
        map((p: [Params, Params]) => ({
          // tslint:disable-next-line:no-string-literal
          id: p[0]["id"],
          // tslint:disable-next-line:no-string-literal
          section: p[1]["section"]
        })),
        map(
          p => ({
            doc: docItems.getItemById(p.id, p.section),
            section: p.section
          }),
          takeUntil(this.destroyed)
        )
      )
      .subscribe(d => {
        this.componentDocItem = d.doc;
        if (this.componentDocItem) {
          this.componentDocItem.examples.length
            ? this.sections.add("examples")
            : this.sections.delete("examples");
        } else {
          this.router.navigate(["/" + d.section]);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }
}

@Component({
  selector: "app-component-examples",
  templateUrl: "./component-examples.html",
  encapsulation: ViewEncapsulation.None
})
export class ComponentExamplesComponent implements OnInit {
  @ViewChild("intialFocusTarget", { static: true })
  focusTarget: ElementRef;

  constructor(public componentViewer: ComponentViewerComponent) {}

  ngOnInit() {
    // 100ms timeout is used to allow the page to settle before moving focus for screen readers.
    setTimeout(() => this.focusTarget.nativeElement.focus(), 100);
  }
}

@NgModule({
  imports: [RouterModule, DocViewerModule, CommonModule],
  exports: [ComponentViewerComponent],
  declarations: [ComponentViewerComponent, ComponentExamplesComponent],
  providers: [DocumentationItems]
})
export class ComponentViewerModule {}
