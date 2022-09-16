import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  Output,
  ViewContainerRef
} from "@angular/core";
import { ComponentPortal, DomPortalOutlet } from "@angular/cdk/portal";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { ExampleViewerComponent } from "../example-viewer/example-viewer";
import { HeaderLinkComponent } from "./header-link";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-doc-viewer",
  template: "Loading document..."
})
export class DocViewerComponent implements OnDestroy {
  private portalHosts: DomPortalOutlet[] = [];
  private documentFetchSubscription: Subscription;

  /** The URL of the document to display. */
  @Input()
  set documentUrl(url: string) {
    this._fetchDocument(url);
  }

  @Output()
  contentLoaded = new EventEmitter<void>();

  /** The document text. It should not be HTML encoded. */
  textContent = "";

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private httpClient: HttpClient,
    private injector: Injector,
    private viewContainerRef: ViewContainerRef,
    private router: Router
  ) {}

  /** Fetch a document by URL. */
  private _fetchDocument(url: string) {
    // Cancel previous pending request
    if (this.documentFetchSubscription) {
      this.documentFetchSubscription.unsubscribe();
    }

    this.documentFetchSubscription = this.httpClient
      .get(url, { responseType: "text" })
      .subscribe(
        document => this.updateDocument(document),
        error => this.showError(url, error)
      );
  }

  /**
   * Updates the displayed document
   * @param document The raw document content to show.
   */
  private updateDocument(document: string) {
    this.elementRef.nativeElement.innerHTML = document;
    this.textContent = this.elementRef.nativeElement.textContent;
    this._loadComponents("material-docs-example", ExampleViewerComponent);
    this._loadComponents("header-link", HeaderLinkComponent);
    this._fixFragmentUrls();
    this.contentLoaded.next();
  }

  /** Show an error that ocurred when fetching a document. */
  private showError(url: string, error: HttpErrorResponse) {
    //console.log(error);
    this.elementRef.nativeElement.innerText = `Failed to load document: ${url}. Error: ${error.statusText}`;
  }

  releadLiveExamples() {
    // When the example viewer is dynamically loaded inside of md-tabs, they somehow end up in
    // the wrong place in the DOM after switching tabs. This function is a workaround to
    // put the live examples back in the right place.
    this._clearLiveExamples();
    this._loadComponents("material-docs-example", ExampleViewerComponent);
    this._loadComponents("header-link", HeaderLinkComponent);
  }

  /** Instantiate a ExampleViewer for each example. */
  private _loadComponents(componentName: string, componentClass: any) {
    const exampleElements = this.elementRef.nativeElement.querySelectorAll(
      `[${componentName}]`
    );

    Array.prototype.slice.call(exampleElements).forEach((element: Element) => {
      const example = element.getAttribute(componentName);
      const portalHost = new DomPortalOutlet(
        element,
        this.componentFactoryResolver,
        this.appRef,
        this.injector
      );
      const examplePortal = new ComponentPortal(
        componentClass,
        this.viewContainerRef
      );
      const exampleViewer = portalHost.attach(examplePortal);
      (exampleViewer.instance as ExampleViewerComponent).example = example;

      this.portalHosts.push(portalHost);
    });
  }

  private _clearLiveExamples() {
    this.portalHosts.forEach(h => h.dispose());
    this.portalHosts = [];
  }

  /**
   * A fragment link is a link that references a specific element on the page that should be
   * scrolled into the viewport on page load or click.
   *
   * By default those links refer to the root page of the documentation and the fragment links
   * won't work properly. Those links need to be updated to be relative to the current base URL.
   */
  private _fixFragmentUrls() {
    const baseUrl = this.router.url.split("#")[0];
    const anchorElements = [].slice.call(
      this.elementRef.nativeElement.querySelectorAll("a")
    ) as HTMLAnchorElement[];

    // Update hash links that are referring to the same page and host. Links that are referring
    // to a different destination shouldn't be updated. For example the Google Fonts URL.
    anchorElements
      .filter(anchorEl => anchorEl.hash && anchorEl.host === location.host)
      .forEach(anchorEl => (anchorEl.href = `${baseUrl}${anchorEl.hash}`));
  }

  ngOnDestroy() {
    this._clearLiveExamples();

    if (this.documentFetchSubscription) {
      this.documentFetchSubscription.unsubscribe();
    }
  }
}
