import { Component } from "@angular/core";

@Component({
  selector: "app-media",
  templateUrl: "./media.component.html",
  styleUrls: ["./media.component.scss"]
})
export class MediaComponent {
  images: any[] = [];
  num = 1;

  constructor() {
    for (let i = this.num; i <= 21; i += 1) {
      this.images.push(i);
    }
  }
}
