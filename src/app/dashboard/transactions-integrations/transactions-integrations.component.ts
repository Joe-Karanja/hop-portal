import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Chart } from 'chart.js';

import { GlobalService } from '../../shared/global.service';
import { HttpService } from '../../shared/http.service';

@Component({
  selector: 'app-transactions-integrations',
  templateUrl: './transactions-integrations.component.html',
  styleUrls: ['./transactions-integrations.component.scss']
})
export class TransactionsIntegrationsComponent implements OnInit, OnChanges {
  
  dataset: any[];
  integrationsChart: any;
  integrationsLabels: string[];
  @Input() availableProjects;
  @Input() endDate;
  @Input() projectCode;
  @Input() projectBool;
  @Input() serviceBool;
  @Input() channelBool;
  @Input() selectedChannel;
  @Input() selectedService;
  @Input() startDate;
  
  schoolPay;
  selectedProject;
  zamtel;
  ziamis;

  constructor(
    private _globalService: GlobalService,
    private _httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.createIntegrationsModel();
  }

  ngOnChanges(): void {
    this.createIntegrationsModel();
  }

  //plots integration chart
  private plotGraph(): void {
    let cntx = document.getElementById("integrationsCanvas") as HTMLCanvasElement;
    if (this.integrationsChart) {
      this.integrationsChart.destroy();
    }
    this.integrationsChart = new Chart(cntx.getContext('2d'), {
      type: "line",
      data: {
        labels: this.integrationsLabels,
        datasets: this.dataset,
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
            position: "top"
          }
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Transaction Dates'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Transaction Value'
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

  /*** 
   * calls http service function responsible for fetching data and assigns chart values
   * */
  private postStoredIntegrations(model) {
    this._httpService.postStored(model).subscribe(res => {
      if(res['status'] === 200) {
        let container = {};
        let labels = [];
        let schoolPay = [];
        let mock = [];
        let zamtel = [];
        let ziamis = [];
        res.data.map(item => {
          container[item["PROJECT_NAME"]] = item["DATASET"];
          item['DATASET'].map(day => {
            labels.push(day['days']);
          })
        });
        if (container["School Pay Integrations"]) {
          container["School Pay Integrations"].map(it => {
            schoolPay.push(it['sum']);
          });
        }
        if (container['MOCKS']) {
          container['MOCKS'].map(it => {
            mock.push(it['sum']);
          })
        }
        if (container['ZAMTEL']) {
          container['ZAMTEL'].map(it => {
            zamtel.push(it['sum']);
          })
        }
        if (container['ZIAMIS']) {
          container['ZIAMIS'].map(it => {
            ziamis.push(it['sum']);
          })
        }
        this.integrationsLabels = Array.from(new Set(labels));
        this.schoolPay = schoolPay;
        this.zamtel = zamtel;
        this.ziamis = ziamis
        this.dataset = [];
        if (schoolPay.length > 0) {
          this.dataset.push({
            label: 'School Pay Integrations',
            data: this.schoolPay,
            borderColor: "#14314f",
            fill: false
          })
        }
        if (zamtel.length > 0) {
          this.dataset.push({
            label: 'ZAMTEL',
            data: this.zamtel,
            borderColor: "#387CA6",
            fill: false
          })
        }
        if (ziamis.length > 0) {
          this.dataset.push({
            label: 'ZIAMIS',
            data: this.ziamis,
            borderColor: "#d91A1A",
            fill: false
          })
        }
        this.plotGraph();
      }
    });
  }

  //creates transactions model query
  createIntegrationsModel(): void {
    if (!this.projectBool && !this.serviceBool && !this.channelBool) {
      let model = {
        procedure:"A_SP_ALL_GET_ALL_PROJECTS",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            C_1:""
        }
      };
      this.postStoredIntegrations(model);
    } else if (!this.projectBool && this.serviceBool && !this.channelBool) {
      let model = {
        procedure:"A_SP_GET_PROJECTS_BY_SERVICE",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            V_SERVICE_NAME: this.selectedService,
            C_1:""
        }
      };
      this.postStoredIntegrations(model);
    } else if (this.projectBool && !this.serviceBool && !this.channelBool) {
      let model = {
        procedure:"A_SP_GET_PROJECT_BY_PROJECTCODE",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            V_PROJECT_CODE:this.projectCode,
            C_1:""
        }
      };
      this.postStoredIntegrations(model);
    } else if (!this.projectBool && !this.serviceBool && this.channelBool) {
      let model = {
        procedure:"A_SP_GET_PROJECTS_BY_CHANNEL",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            V_CHANNEL_CODE:this.selectedChannel,
            C_1:""
        }
      };
      this.postStoredIntegrations(model);
    } 
  //   else if (this.projectBool && this.serviceBool && this.channelBool) {
  //     let model = {
  //       procedure: "A_SP_GET_ALL_COMBINED_DATA",
  //       parameters: {
  //         V_FROM_DATE: this.startDate,
  //         V_TO_DATE: this.endDate,
  //         V_PROJECT_CODE: this.projectCode,
  //         V_SERVICE_ID: this.selectedService,
  //         V_CHANNEL_KEY: this.selectedChannel,
  //         C_1: ""
  //       }
  //     }
  //     this.postStoredIntegrations(model);
  // } else if (this.projectBool && this.serviceBool && !this.channelBool) {
  //   let model = {
  //     procedure: "A_SP_GET_ALL_COMBINED_DATA",
  //     parameters: {
  //       V_FROM_DATE: this.startDate,
  //       V_TO_DATE: this.endDate,
  //       V_PROJECT_CODE: this.projectCode,
  //       V_SERVICE_ID: this.selectedService,
  //       V_CHANNEL_KEY: "",
  //       C_1: ""
  //     }
  //   }
  //   this.postStoredIntegrations(model);
  // } else if (!this.projectBool && this.serviceBool && this.channelBool) {
  //   let model = {
  //     procedure: "A_SP_GET_ALL_COMBINED_DATA",
  //     parameters: {
  //       V_FROM_DATE: this.startDate,
  //       V_TO_DATE: this.endDate,
  //       V_PROJECT_CODE: "",
  //       V_SERVICE_ID: this.selectedService,
  //       V_CHANNEL_KEY: this.selectedChannel,
  //       C_1: ""
  //     }
  //   }
  //   this.postStoredIntegrations(model);
  // } else if (this.projectBool && !this.serviceBool && this.channelBool) {
  //   let model = {
  //     procedure: "A_SP_GET_ALL_COMBINED_DATA",
  //     parameters: {
  //       V_FROM_DATE: this.startDate,
  //       V_TO_DATE: this.endDate,
  //       V_PROJECT_CODE: this.projectCode,
  //       V_SERVICE_ID: "",
  //       V_CHANNEL_KEY: this.selectedChannel,
  //       C_1: ""
  //     }
  //   }
  //   this.postStoredIntegrations(model);
  // } 
  }

  //plots single project transactions
  viewSingleProjectDetails(event): void {
    this.selectedProject = event;
    if (this.selectedProject !== "All") {
      let model = {
        procedure:"A_SP_GET_PROJECT_BY_PROJECTCODE",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            V_PROJECT_CODE:this.selectedProject,
            C_1:""
        }
      };
      this.postStoredIntegrations(model);
    } else {
      this.selectedProject = '';
      this.createIntegrationsModel();
    }
  }

}
