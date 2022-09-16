import { Component } from "@angular/core";

@Component({
  selector: "app-social",
  templateUrl: "./social.component.html",
  styleUrls: ["./social.component.scss"]
})
export class SocialComponent {
  images: any[] = [];
  num = 1;

  pieChartColors: any[] = [
    {
      backgroundColor: ["#f44336", "#3f51b5", "#ffeb3b", "#4caf50", "#2196f"]
    }
  ];

  pieOptions: any = {
    responsive: true,
    legend: {
      position: "right"
    }
  };

  pieChartLabels: string[] = ["MS Word", "Typing", "Sage Pastel"];
  pieChartData: number[] = [300, 500, 100];
  pieChartType = "pie";

  constructor() {
    for (let i = this.num; i <= 9; i += 1) {
      this.images.push(i);
    }
  }
}
