import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Chart } from 'chart.js';

import { HttpService } from '../../shared/http.service';

@Component({
  selector: 'app-transactions-services',
  templateUrl: './transactions-services.component.html',
  styleUrls: ['./transactions-services.component.scss']
})
export class TransactionsServicesComponent implements OnInit, OnChanges {


  @Input() availableServices;
  @Input() endDate;
  @Input() projectCode;
  @Input() projectBool;
  @Input() serviceBool;
  @Input() channelBool;
  @Input() selectedChannel;
  @Input() selectedService;
  @Input() startDate;
  selectedSingleService;
  servicesChart;
  servicesChartData;
  serviceChartLabels;

  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.createServicesModel();
  }

  ngOnChanges(): void {
    this.createServicesModel();
  }

  //creates services transaction query model
  createServicesModel(): void {
    let model = {
      query: "GET_SERVICES_TRANS_QUERY",
      data: {
        FROM: this.startDate,
        TO: this.endDate
      }
    };
    if (this.projectBool) {
      model.data["PROJECT_CODE"] = this.projectCode; 
    }
    if (this.serviceBool) {
      model.data["SERVICE_ID"] = this.selectedService;
    }
    if (this.channelBool) {
      model.data["CHANNEL_CODE"] = this.selectedChannel;
    }
    this.postDBServices(model);
  }

  //posts transactions query model
  private postDBServices(model) {
    // this._httpService.postDb(model).subscribe(res => {
    //   if (res['status'] === 200) {
    //     let labels = [];
    //     let data = [];
    //     let counts = [];
    //     res['data'].map(item => {
    //       labels.push(item['FIELD12']);
    //       data.push(Number(item['TOTAL_TRANS_VALUE']));
    //       counts.push(Number(item['TOTAL_TRANS_COUNT']))
    //     });
    //     this.servicesChartData = counts;
    //     this.serviceChartLabels = labels;
    //     if (this.servicesChart) {
    //       this.servicesChart.destroy();
    //     }
    //     this.plotGraph();
    //   }
    // })
  }

  //plots services transactional data
  private plotGraph(): void {
    let cntx = document.getElementById("servicesSumCanvas") as HTMLCanvasElement;
    this.servicesChart = new Chart(cntx.getContext('2d'), {
      type: "doughnut",
      data: {
        labels: this.serviceChartLabels,
        datasets: [{
          data: this.servicesChartData,
          backgroundColor: [
            "#14314f",
            "#868484",
            "#d91A1A",
            "#387CA6"
          ],
        },
        ]            
      },
      options: {
        legend: {
          display: true,
          position: "right",
          align: "center"
        },
        responsive: true,
        plugins: {
          datalabels: {
            display: true,
            anchor: 'center'
          },
          doughnutlabel: {
            labels: [
              {
                text: '550',
                font: {
                  size: 20,
                  weight: 'bold'
                }
              }
          ]
          },
          tooltips: {
            value: this.servicesChartData,
            count: this.servicesChartData
          }
        }
      }
    })
  }

  //retrvieves single servce transactional data
  singleServiceTransacions(event): void {
    this.selectedSingleService = event;
    if (this.selectedSingleService !== "All") {
      let model = {
        query: "GET_SERVICES_TRANS_QUERY",
        data: {
          FROM: this.startDate,
          TO: this.endDate,
          SERVICE_ID: this.selectedSingleService
        }
      };
      this.postDBServices(model);
    } else {
      this.selectedSingleService = "";
      this.createServicesModel();
    }
  }

}
