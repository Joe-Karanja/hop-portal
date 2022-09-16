import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Chart } from 'chart.js';

import { GlobalService } from '../../shared/global.service';
import { HttpService } from '../../shared/http.service';

@Component({
  selector: 'app-values-trend',
  templateUrl: './values-trend.component.html',
  styleUrls: ['./values-trend.component.scss']
})
export class ValuesTrendComponent implements OnInit, OnChanges {

  branchTransactions: any[] = [];
  channelChart: any;
  dataSet: any[];
  eclecticsTransactions: any[] = [];
  @Input() availableChannels;
  @Input() channelBool;
  @Input() endDate;
  @Input() projectBool;
  @Input() projectCode;
  @Input() selectedService;
  @Input() selectedChannel;
  @Input() serviceBool;
  @Input() startDate;
  lineChartLabels: string[];
  selectedSingleChannel: string;
  unknownChannelTransactions: number[] = [];

  constructor(
    private _globalService: GlobalService,
    private _httpService: HttpService
  ) { }

  ngOnInit(): void {
    //this.createModel();
  }

  ngOnChanges(): void {
    this.createModel();
  }

  //creates model to send to the backend
  createModel(): void {
    if (!this.projectBool && !this.serviceBool && !this.channelBool) {
      let model = {
        procedure:"A_SP_GET_ALL_CHANNELS",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            C_1:""
        }
      };
      this.getTransactions(model);
    } else if (this.projectBool && !this.serviceBool && !this.channelBool) {
      
      let model = {
        procedure:"A_SP_CHANNELS_BY_PROJECT",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            V_PROJECT_CODE: this.projectCode,
            C_1:""
        }
      };
      this.getTransactions(model);
    } else if (!this.projectBool && this.serviceBool && !this.channelBool) {
      let model = {
        procedure:"A_SP_CHANNELS_BY_SERVICE",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            V_SERVICE_NAME: this.selectedService,
            C_1:""
        }
      };
      this.getTransactions(model);
    } else if (!this.projectBool && !this.serviceBool && this.channelBool) {
      let model = {
        procedure:"A_SP_GET_CHANNELS_BY_CHANNEL",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            V_CHANNEL_CODE: this.selectedChannel,
            C_1:""
        }
      };
      this.getTransactions(model);
    } else if (this.projectBool && this.serviceBool && this.channelBool) {
        let model = {
          procedure: "A_SP_GET_ALL_COMBINED_DATA",
          parameters: {
            V_FROM_DATE: this.startDate,
            V_TO_DATE: this.endDate,
            V_PROJECT_CODE: this.projectCode,
            V_SERVICE_ID: this.selectedService,
            V_CHANNEL_KEY: this.selectedChannel,
            C_1: ""
          }
        }
        this.getTransactions(model);
    } else if (this.projectBool && this.serviceBool && !this.channelBool) {
      let model = {
        procedure: "A_SP_GET_ALL_COMBINED_DATA",
        parameters: {
          V_FROM_DATE: this.startDate,
          V_TO_DATE: this.endDate,
          V_PROJECT_CODE: this.projectCode,
          V_SERVICE_ID: this.selectedService,
          V_CHANNEL_KEY: "",
          C_1: ""
        }
      }
      this.getTransactions(model);
    } else if (!this.projectBool && this.serviceBool && this.channelBool) {
      let model = {
        procedure: "A_SP_GET_ALL_COMBINED_DATA",
        parameters: {
          V_FROM_DATE: this.startDate,
          V_TO_DATE: this.endDate,
          V_PROJECT_CODE: "",
          V_SERVICE_ID: this.selectedService,
          V_CHANNEL_KEY: this.selectedChannel,
          C_1: ""
        }
      }
      this.getTransactions(model);
    } else if (this.projectBool && !this.serviceBool && this.channelBool) {
      let model = {
        procedure: "A_SP_GET_ALL_COMBINED_DATA",
        parameters: {
          V_FROM_DATE: this.startDate,
          V_TO_DATE: this.endDate,
          V_PROJECT_CODE: this.projectCode,
          V_SERVICE_ID: "",
          V_CHANNEL_KEY: this.selectedChannel,
          C_1: ""
        }
      }
      this.getTransactions(model);
    }
  }

  //sends transactions requests
  private getTransactions(model): void {
    this.eclecticsTransactions = [];
    this.branchTransactions = [];
    this._httpService.postStored(model).subscribe(res => {
      console.log(res);
      if (res["status"] === 200) {
        let container = {};
        let labels = [];
        
        res.data.map(item => {
          container[item["CHANNEL"]] = item["DATASET"];
          item['DATASET'].map(day => {
            labels.push(day['days']);
          })
        });
        if (container["Eclectics Dev"] !== undefined) {
          container["Eclectics Dev"].map(it => {
            this.eclecticsTransactions.push(it['sum']);
          })
        } 
        if (container["Branch Teller"] !== undefined) {
          container["Branch Teller"].map(it => {
            this.branchTransactions.push(it['sum']);
          });
        }
        // if (container["ZAMTEL MERCHANT SYSTEM"] !== undefined) {
        //   container["ZAMTEL MERCHANT SYSTEM"].map(it )
        // }
        this.lineChartLabels = Array.from(new Set(labels));
        if (this.eclecticsTransactions.length > 0 && this.branchTransactions.length > 0) {
          this.dataSet = [
            {
              label: "Branch Teller",
              data: this.branchTransactions,
              borderColor: "#14314f",
              fill: false,
            },
            {
              label: "Eclectics Dev",
              data: this.eclecticsTransactions,
              borderColor: "#387CA6",
              fill: false,
            }
          ]
        } else if (this.eclecticsTransactions.length > 0 && this.branchTransactions.length == 0) {
          this.dataSet = [
            {
              label: "Eclectics Dev",
              data: this.eclecticsTransactions,
              borderColor: "#387CA6",
              fill: false,
            }
          ]
        } else {
          this.dataSet = [
            {
              label: "Branch Teller",
              data: this.branchTransactions,
              borderColor: "#14314f",
              fill: false,
            }
          ]
        }
        this.plotGraph();
      }
    })
  }

  //plotst transaction by channels
  private plotGraph(): void {
    let cntx = document.getElementById("sordersCanvas") as HTMLCanvasElement;
    if (this.channelChart) {
      this.channelChart.destroy();
    };
  
    this.channelChart = new Chart(cntx.getContext('2d'), {
      type: "line",
      data: {
        labels: this.lineChartLabels,
        datasets: this.dataSet
      },
      options: {
        legend: {
          display: true,
          position: "right",
          align: "center"
        },
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontColor: "#000080",
            }
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "rgba(0,0,0,0.02)",
                zeroLineColor: "rgba(0,0,0,0.02)"
              },
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Transactions Dates'
              },
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: "rgba(0,0,0,0.02)",
                zeroLineColor: "rgba(0,0,0,0.02)"
              },
              ticks: {
                callback: (value, index, values) => {
                  return this._globalService.formatChartData(value);
                },
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Transaction Values'
              },
              stacked: true
            }
          ]
        }
      }
    }) 
    
  }

  //retrieves transactions by channel
  viewSingleChannelDetails(event): void {
    this.selectedSingleChannel = event;
    if (this.selectedSingleChannel !== "All") {
      let model = {
        procedure:"A_SP_GET_CHANNELS_BY_CHANNEL",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            V_CHANNEL_CODE: this.selectedSingleChannel,
            C_1:""
        }
      };
      this.getTransactions(model);
    } else {
      this.selectedSingleChannel = '';
      this.createModel();
    }
  }
}
