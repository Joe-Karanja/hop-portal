import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Chart } from 'chart.js';

import { GlobalService } from '../../shared/global.service';
import { HttpService } from '../../shared/http.service';

@Component({
  selector: 'app-success-failed',
  templateUrl: './success-failed.component.html',
  styleUrls: ['./success-failed.component.scss']
})
export class SuccessFailedComponent implements OnInit, OnChanges {

  barChartData: any[];
  barChartLabels: string[];
  barChartType: string = "bar";
  datesArray: string[];
  defaultValue: any = {
    value: 0
  }
  graphC: any;
  @Input() endDate;
  @Input() projectCode;
  @Input() selectedService;
  @Input() selectedChannel;
  @Input() startDate;
  successValueChart: any;
  successfulTrans: number[] = [];
  successfulCount: number[] = [];
  toggleCount: boolean = false;
  toggleTitle: string = "Line Graph";
  toggleValue: boolean = false;
  unsuccessfulTrans: number[] = [];
  unsuccessfulTransCount: number[] = [];
  valueData: any;

  constructor(
    private _globalService: GlobalService,
    private _httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.createModel();
    this.getDatesArray();
    //this.datesArray = this._globalService.enumerateDaysBetweenDates(this.startDate, this.endDate);
  }

  ngOnChanges(): void {
    this.createModel();
    this.getDatesArray();
  }

  //constructs date range fron provided dates
  getDatesArray(): void {
    console.log("start date: ", this.startDate);
    console.log("end date: ", this.endDate);
    this.datesArray = this._globalService.enumerateDaysBetweenDates(this.startDate, this.endDate);
    console.log("date range: ", this.datesArray);
  }

  //toggles line and bar graph
  toggleBarType(event): void {
    this.toggleValue = event;
    if (this.toggleValue == false) {
      this.barChartType = "bar";
      this.toggleTitle = "Line Graph"
    } else {
      this.barChartType = "line";
      this.toggleTitle = "Bar Graph";
    }
    this.plotValues();
  }

  //toggles values and counts graphs
  toggleCountValue(): void {
    this.toggleCount = !this.toggleCount;
    this.plotValues();
  }

  //loads values data
  loadTransactions(model): void {
    this.successfulTrans = [];
    this.unsuccessfulTrans = [];
    this.successfulCount = [];
    this.unsuccessfulTransCount = [];
    // this._httpService.postDb(model).subscribe(res => {
    //   if (res["status"] === 200) {
    //     this.valueData = res["data"];
    //     let found = false;
    //     let labels = [];
    //     let newResArray = [];
    //     this.datesArray.map(date => {
    //       let container = {};
    //       this.valueData.map(item => {
    //         if (date == item['DAY']) {
    //           found = true;
    //           container["day"] = item['DAY'];
    //           container["success_value"] = Number(item['TOTAL_SUCCESS_VALUE']);
    //           container["failed_value"] = Number(item['TOTAL_FAILED_VALUE']);
    //           container["success_count"] = Number(item['TOTAL_SUCCESS_COUNT']);
    //           container["failed_count"] = Number(item['TOTAL_FAILED_COUNT']);
    //           newResArray.push(container);
    //         }
    //       })
    //       if (found == false) {
    //         container["day"] = date;
    //         container["success_value"] = 0;
    //         container["failed_value"] = 0;
    //         container["success_count"] = 0
    //         container["failed_count"] = 0;
    //         newResArray.push(container);
    //       }
    //     })
    //     newResArray.map(item => {
    //       labels.push(item["day"]);
    //       this.successfulTrans.push(item["success_value"]);
    //       this.unsuccessfulTrans.push(item["failed_value"]);
    //       this.successfulCount.push(item["success_count"]);
    //       this.unsuccessfulTransCount.push(item["failed_count"]);
    //     })
    //     this.barChartLabels = Array.from(new Set(labels));
    //     this.plotValues();
    //   }
    // })
  }

  private plotValues() {
    let cntx = document.getElementById("valueCanvas") as HTMLCanvasElement;
    if (this.successValueChart) {
      this.successValueChart.destroy();
    }
    this.successValueChart = new Chart(cntx.getContext('2d'), {
      type: this.barChartType,
      data: {
        labels: this.barChartLabels,
        datasets: [
          {
            data: this.toggleCount ? this.successfulCount : this.successfulTrans,
            label: "Successful Transactions",
            backgroundColor: "#14314f",
            borderColor: "#14314f",
            borderWidth: 0
          },
          {
            data: this.toggleCount ? this.unsuccessfulTransCount : this.unsuccessfulTrans,
            label: "Failed Transactions",
            backgroundColor: "#868484",
            borderColor: "#868484",
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          }
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Transactions Dates'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: this.toggleCount ? "Transactions Count": 'Transactions Value'
            },
            ticks: {
              callback: (value, index, values) => {
                return this._globalService.formatChartData(value);
              },
              beginAtZero: true,
            }
          }]
        }
      }
    })
  }

  //charts transaction counts 
  createModel(): void {
    let model = {
      query: "GET_DASHBOARD_SUMMARY_DAILY",
      data: {
        FROM: this.startDate,
        TO: this.endDate
      }
    };
    if (this.projectCode ) {
      model.data['PROJECT_CODE'] = this.projectCode;
    }
    if (this.selectedService ) {
      model.data['SERVICE_ID'] = this.selectedService;
    }
    if (this.selectedChannel ) {
      model.data['CHANNEL_CODE'] = this.selectedChannel;
    }
    this.loadTransactions(model);
  }
}
