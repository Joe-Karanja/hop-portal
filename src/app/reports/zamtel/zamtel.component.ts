import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Chart } from 'chart.js';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { DataExportationService } from '../../shared/data-exportation.service';
import { HttpService } from '../../shared/http.service';
import { GlobalService } from '../../shared/global.service';


@Component({
  selector: 'app-zamtel',
  templateUrl: './zamtel.component.html',
  styleUrls: ['./zamtel.component.scss']
})
export class ZamtelComponent implements OnChanges, OnInit {

  globalChartOptions: any = {
    responsive: true,
    legend: {
      display: true,
      position: "top"
    }
  };
  availableChannels: string;
  availableServices: string;
  barChartData: any[];
  barChartLabels: string[];
  barChartType: string;
  barChartLegend = true;
  barChartOptions: any = Object.assign(
    {
      scaleShowVerticalLines: false,
      tooltips: {
        mode: "index",
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "rgba(0,0,0,0.02)",
              defaultFontColor: "rgba(0,0,0,0.02)",
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
              defaultFontColor: "rgba(0,0,0,0.02)",
              zeroLineColor: "rgba(0,0,0,0.02)"
            },
            ticks: {
              callback: function(value, index, values) {
                return +value / 1e6 + "M";
              },
            },
            scaleLabel: {
              display: true,
              labelString: 'Transaction Values'
            },
            stacked: true
          }
        ]
      }
    },
    this.globalChartOptions
  );
  cardTitle: string;
  columnsRows: any[];
  columnsTransactions: string[];
  schoolContainer: any = {};
  channelLabels;
  channelBool: boolean = false;
  columnsToExport: any[];
  columnsJson: any = {};
  dataToExport: any[];
  daysArray: string[];
  displayColumns: string[];
  displayDate: boolean = false;
  doughnutData: any[];
  doughnutLabels: string[];
  doughnutType: string;
  endDate: string;
  exportTitle: string;
  failedBool: boolean = false;
  failedCount: number;
  failedIntegrations: any[] = [];
  failedServices: any[] = [];
  indicatedColumns: any[] = [];
  integrationsChart;
  loading: boolean = false;
  mandatoryColumns: string[] = ["ESB Reference ID", "Service Name", "Channel Name", "Transaction Status", "Transaction Amount", "CreatedOn"];
  page: number = 1;
  pendingCount: number;
  pendingTransactions: number[];
  perPage: number = 1000;
  projectCode: any = 'ZAMTEL001';
  serviceBool: boolean = false;
  selectedChannel: string;
  selectedService: string;
  selectedDate: string;
  selectedStatus: any = "";
  selectedStatusIntegrations: any = '';
  selectionBool: boolean = false;
  selectionOnBool: boolean = false;
  selections: string[] = ["Successful", "Failed"];
  servicesChart;
  serviceCounts: number[];
  serviceLabels: string[];
  startDate: string;
  successBool: boolean = false;
  successChart;
  successCount: number;
  successIntegrations: any[] = [];
  successServices: number;
  successfulTransactions: number[];
  total: number;
  transBool: boolean = false;
  transactions: any[];
  unsuccessfulTransactions: number[];
  zamtelTransactions: number[] = [];

  constructor(
    private _dataExportationService: DataExportationService,
    private _globalService: GlobalService,
    private _httpService: HttpService,
    private router: Router
  ) {
    let today = new Date;
    this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-13).toISOString().slice(0,10);
    this.endDate = new Date().toISOString().slice(0,10);
   }

  ngOnInit(): void {
    this.getChannels();
    this.getDateRange();
    this.getServices();
    this.loadData();
    this.loadStatusCounts();
    this.loadZTransactions();
    this.projectTrans();
    this.successTrans();
    this.cardTitle = "Zamtel Transactions";
  }

  ngOnChanges(): void {
    this.loadData();
    this.loadStatusCounts();
    this.loadZTransactions();
    this.projectTrans();
    this.successTrans();
  }

  getDateRange(): void {
    this.daysArray = this._globalService.enumerateDaysBetweenDates(this.startDate, this.endDate);
  }

  //retrieves available services
  getServices(): void {
    let model = {
      query: "GET_ZAMTEL_SERVICES_TRANS_QUERY",
      data: {}
    };
    this._httpService.postDb(model).subscribe(res => {
      if (res['status'] === 200) {
        this.availableServices = res['data'];
      }
    })
  }

  //retrieves available channels
  getChannels(): void {
    let model = {
      query: "GET_CHANNELS_QUERY",
      data: {}
    };
    this._httpService.postDb(model).subscribe(res => {
      if(res['status'] === 200) {
        this.availableChannels = res['data'];
      }
    })
  }

  private plotServicesGraph(): void {
    let cntx = document.getElementById("servicesSumCanvas") as HTMLCanvasElement;
    if (this.servicesChart) {
      this.servicesChart.destroy();
    }
    this.servicesChart = new Chart(cntx.getContext('2d'), {
      type: "doughnut",
      data: {
        labels: this.serviceLabels,
        datasets: [{
          data: this.serviceCounts,
          backgroundColor: [
            "#d91A1A",
            "#14314f",
            "#868484",
            "#387CA6"
          ],
        },
        ]            
      },
      options: {
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
            tooltip: {
              callbacks: {
                //footer: footer,
              }
            }
          }
      }
    })
  }

  private postDBServices(model) {
    this.serviceCounts = [];
    this._httpService.postDb(model).subscribe(res => {
      if (res['status'] === 200) {
        console.log("services data: ", res);
        let labels = [];
        let data = [];
        let counts = [];
        res['data'].map(item => {
          labels.push(item['FIELD12']);
          console.log("selected status: ", this.selectedStatus);
          if (this.selectedStatus == "") {
            data.push(Number(item['TOTAL_TRANS_VALUE']));
            counts.push(Number(item['TOTAL_TRANS_COUNT']));
          } 
          if (this.selectedStatus == "Successful") {
            data.push(Number(item["TOTAL_SUCCESS_VALUE"]));
            counts.push(Number(item["TOTAL_SUCCESS_COUNT"]))
          } 
          if (this.selectedStatus == "Failed") {
            data.push(Number(item['TOTAL_TRANS_VALUE']) - Number(item["TOTAL_SUCCESS_VALUE"]));
            counts.push(Number(item['TOTAL_TRANS_COUNT']) - Number(item["TOTAL_SUCCESS_COUNT"]));
          }
        });
        this.serviceLabels = labels;
        this.serviceCounts = counts;
        console.log("labels: ", this.serviceLabels);
        console.log("counts: ", this.serviceCounts);
        this.plotServicesGraph();
      }
    })
  }

  private plotIntegrationsGraph(): void {
    let cntx = document.getElementById("integrationsCanvas") as HTMLCanvasElement;
    if (this.integrationsChart) {
      this.integrationsChart.destroy();
    }
    this.integrationsChart = new Chart(cntx.getContext('2d'), {
      type: "line",
      data: {
        labels: this.channelLabels,
        datasets: [
          {
            label: 'Zamtel Integrations',
            data: this.zamtelTransactions,
            borderColor: "#14314f",
            fill: false
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

  private postStoredIntegrations(model) {
    this.zamtelTransactions = [];
    this._httpService.postStored(model).subscribe(res => {
      if(res['status'] === 200) {
        let container = {};
        let labels = [];
        res.data.map(item => {
          if (res.data.length > 0) {
            container[item["PROJECT_NAME"]] = item["DATASET"];
            item['DATASET'].map(day => {
              labels.push(day['days']);
            })
          }
        });
        let zamtelTrans = container["ZAMTEL"];
        if (zamtelTrans !== undefined) {
          zamtelTrans.map(it => {
            if (this.selectedStatusIntegrations == "Successful") {
              this.zamtelTransactions.push(Number(it['total_successs_value']));
            } else if (this.selectedStatusIntegrations == "Failed") {
              this.zamtelTransactions.push(Number(it["sum"]) - Number(it["total_successs_value"]));
            } else {
              this.zamtelTransactions.push(Number(it['sum']));
            }
          });
        }
        if (labels.length > 0) {
          this.channelLabels = Array.from(new Set(labels));
        } else {
          this.channelLabels = this.daysArray;
        }
        
        this.plotIntegrationsGraph();
      }
    });
  }

  private plotSuccessGraph(): void {
    let cntx = document.getElementById("successCanvas") as HTMLCanvasElement;
    if(this.successChart) {
      this.successChart.destroy();
    }
    let dataSet = [
      {
        label: 'Successful Transactions',
        data: this.successfulTransactions,
        backgroundColor: "#14314f",
        borderColor: "#14314f",
        borderWidth: 0
      },
      {
        data: this.unsuccessfulTransactions,
        label: "Failed Transactions",
        backgroundColor: "#868484",
        borderColor: "#868484",
        borderWidth: 0
      }
    ];
    if(this.pendingTransactions) {
      
      dataSet.push({
        data: this.pendingTransactions,
        label: "Pending Transactions",
        backgroundColor: "#387CA6",
        borderColor: "#387CA6",
        borderWidth: 0
      })
    }
    this.successChart = new Chart(cntx.getContext('2d'), {
      type: "bar",
      data: {
        labels: this.barChartLabels,
        datasets: dataSet
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
              labelString: 'Transaction Dates'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Transaction Count'
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

  private postDBValues(model) {
    this.barChartType = 'bar';
    this.successfulTransactions = [];
    this.unsuccessfulTransactions = [];
    this.pendingTransactions = [];
    this._httpService.postDb(model).subscribe(res => {
      if (res['status'] === 200) {
        let found = false;
        let labels = [];
        let newTransData = [];
        let successfulTrans = [];
        let transData = res['data'];
        let unsuccessfulTrans = [];
        let pendingTransactions = [];
        this.daysArray.map(day => {
          let container = {};
          transData.map(trans => {
            if (day == trans["DAY"]) {
              found = true;
              container["day"] = trans["DAY"];
              container["success_value"] = Number(trans["TOTAL_SUCCESS_VALUE"]);
              container["success_count"] = Number(trans["TOTAL_SUCCESS_COUNT"]);
              container["failed_value"] = Number(trans["TOTAL_FAILED_VALUE"]);
              container["failed_count"] = Number(trans["TOTAL_FAILED_COUNT"]);
              container["pending_count"] = Number(trans["TOTAL_PENDING_COUNT"]);
              newTransData.push(container);
            }
          })
          if (found == false) {
            container["day"] = day;
            container["success_value"] = 0;
            container["success_count"] = 0;
            container["failed_value"] = 0;
            container["failed_count"] = 0;
            container["pending_count"] = 0;
            newTransData.push(container);
          }
        })
        newTransData.map(item => {
          labels.push(item["day"]);
          successfulTrans.push(item["success_count"]);
          unsuccessfulTrans.push(item["failed_count"]);
          pendingTransactions.push(item["pending_count"]);
        })
        this.barChartLabels = labels;
        this.successfulTransactions = successfulTrans;
        this.unsuccessfulTransactions = unsuccessfulTrans;
        this.pendingTransactions = pendingTransactions;
        this.plotSuccessGraph();
      }
    });
  }

  private loadZamtelTrans(model): void {
    this._httpService.postDb(model).subscribe(res => {
      if (res["status"] === 200) {
        this.transactions = res["data"];
        this.total = res["totalResults"];
        let columns = [];
        this.transactions.map(it => {
          Object.keys(it).map(item => {
            columns.push(item)
          })
        });
        this.columnsToExport = Array.from(new Set(columns));
        this.mapColumns(this.columnsToExport);
        this.displayColumns = Object.keys(this.columnsJson);
        this.loading = false;
        this.exportDataMandatory();
      }      
    })
  }

  private mapColumns(columns): void {
    columns.map(item => {
      switch(item) {
        case "ID":
          this.columnsJson["ID"] = "ID";
          break;
        case "ESBREFID":
          this.columnsJson["ESB Reference ID"] = "ESBREFID";
          break;
        case "SERVICENAME":
          this.columnsJson["Service Name"] = "SERVICENAME";
          break;
        case "CHANNELNAME":
          this.columnsJson["Channel Name"] = "CHANNELNAME";
          break;
        case "CHANNELREFID":
          this.columnsJson["Channel Reference ID"] = "CHANNELREFID";
          break;
        case "CHANNELCODE":
          this.columnsJson["Channel Code"] = "CHANNELCODE";
          break;
        case "PROJECTCODE":
          this.columnsJson["Project Code"] = "PROJECTCODE";
          break;
        case "TRANSACTIONAMOUNT":
          this.columnsJson["Transaction Amount"] = "TRANSACTIONAMOUNT";
          break;
        case "TRANSACTIONCHARGEAMOUNT":
          this.columnsJson["Transaction Charge"] = "TRANSACTIONCHARGEAMOUNT";
          break;
        case "CURRENCY":
        this.columnsJson["Currency"] = "CURRENCY";
          break;
        case "BILLERREFNO":
          this.columnsJson["Biller Reference Number"] = "BILLERREFNO";
            break;
        case "PAIDBY":
          this.columnsJson["Client Name"] = "PAIDBY";
          break;
        case "PAIDBYMOBILENUMBER":
          this.columnsJson["Client Number"] = "PAIDBYMOBILENUMBER";
          break;
        case "TRANSACTIONNARRATION":
          this.columnsJson["Narration"] = "TRANSACTIONNARRATION";
          break;
        case "TRANSACTIONRESPONSE":
          this.columnsJson["Transaction Status"] = "TRANSACTIONRESPONSE";
        case "PRIMARYACCOUNTNUMBER":
          this.columnsJson["Primary Account Number"] = "PRIMARYACCOUNTNUMBER";
          break;
        case "PROCESSINGCODE":
          this.columnsJson["Processing Code"] = "PROCESSINGCODE";
          break;
        case "DEBITACCOUNT":
          this.columnsJson["Debit Account"] = "DEBITACCOUNT";
          break;
        case "CREDITACCOUNT":
          this.columnsJson["Credit Account"] = "CREDITACCOUNT";
          break;
        case "BANKSHORTCODE":
          this.columnsJson["Bank Short Code"] = "BANKSHORTCODE";
          break;
        case "THIRDPARTYREFID":
          this.columnsJson["Third Party Reference ID"] = "THIRDPARTYREFID";
          break;
        case "RECEIVERPARTYIDENTIFIER":
          this.columnsJson["Receiver Reference ID"] = "RECEIVERPARTYIDENTIFIER";
          break;
        case "CREATED_ON":
          this.columnsJson["CreatedOn"] = "CREATED_ON";
          break;
      }
    });
  }

  //loads Zamtel Transactions
  loadZTransactions(): void {
    this.loading = true;
    let model = {
      query: "GET_ZAMTEL_TRANSACTIONS",
      data: {
        PAGE: this.page - 1,
        SIZE: this.perPage,
        FROM: this.startDate,
        TO: this.endDate
      }
    }
    if (this.selectedService) {
      model.data["SERVICE_ID"] = this.selectedService;
    }
    if (this.selectedChannel) {
      model.data["CHANNEL_CODE"] = this.selectedChannel;
    }
    this.loadZamtelTrans(model);
  }

  //plots transactions by services
  loadData(): void {
    let model = {
      query: "GET_SERVICES_TRANS_QUERY",
      data: {
        FROM: this.startDate,
        TO: this.endDate,
        PROJECT_CODE: this.projectCode
      }
    } 
    if (this.selectedService) {
      model.data["SERVICE_ID"] = this.selectedService;
    }
    if (this.selectedChannel) {
      model.data["CHANNEL_CODE"] = this.selectedChannel;
    }
    if (this.selectedStatus) {
      model.data["TRANSACTION_STATUS"] = this.selectedStatus;
    }
    this.postDBServices(model);
  }

  //displays services by success status
  successChange(event): void {
    this.selectedStatus = event;
    if (this.selectedStatus !== "All") {
      this.loadData();
    } else {
      this.selectedStatus = "";
      this.loadData();
    }
  }

  //plots transactions by integration
  projectTrans(): void {
    if (!this.serviceBool && !this.channelBool) {
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
    } else if (!this.serviceBool && this.channelBool) {
      let model = {
        procedure:"A_SP_GET_PROJECTS_BY_CHANNEL",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            V_PROJECT_CODE:this.projectCode,
            V_CHANNEL_CODE:this.selectedChannel,
            C_1:""
        }
      };
      this.postStoredIntegrations(model);
    } else if (this.serviceBool && !this.channelBool) {
      let model = {
        procedure:"A_SP_GET_PROJECTS_BY_SERVICE",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            //V_PROJECT_CODE:this.projectCode,
            V_SERVICE_NAME:this.selectedService,
            C_1:""
        }
      };
      this.postStoredIntegrations(model);
    }
  }

  //plots transactions by transactions success status
  successTrans(): void {
    let model = {
      query: "GET_DASHBOARD_SUMMARY_DAILY",
      data: {
        FROM: this.startDate,
        TO: this.endDate,
        PROJECT_CODE: this.projectCode
      }
    };
    if (this.selectedService) {
      model.data["SERVICE_ID"] = this.selectedService;
    } 
    if (this.selectedChannel) {
      model.data["CHANNEL_CODE"] = this.selectedChannel;
    }
    this.postDBValues(model);
  }

  //displays integrations trend by success status
  successIntegrationsChange(event): void {
    this.selectedStatusIntegrations = event;
    if (this.selectedStatusIntegrations !== "All") {
      this.projectTrans();
    } else {
      this.selectedStatusIntegrations = "";
      this.projectTrans();
    }
  }

  //displays transactions with the indicated date range
  onDateSelect(event): void {
    this.startDate = new Date(event[0]).toISOString().slice(0,10);
    this.endDate = new Date(event[1]).toISOString().slice(0,10);
    this.getDateRange();
    this.loadData();
    this.projectTrans();
    this.successTrans();
    this.loadStatusCounts();
    this.loadZTransactions();
  }

   //updates request body
   onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.perPage = pageSize;
    this.loadZTransactions();
  }

  onChannelSelect(event): void {
    this.selectedChannel = event;
    if (this.selectedChannel !== "All") {
      this.channelBool = true;
      this.successTrans();
      this.projectTrans();
      this.loadData();
      this.loadStatusCounts();
      this.loadZTransactions();
    } else {
      this.channelBool = false;
      this.selectedChannel = "";
      this.successTrans();
      this.projectTrans();
      this.loadData();
      this.loadStatusCounts();
      this.loadZTransactions();
    }
  }

  onServiceSelect(event): void {
    this.selectedService = event;
    if (this.selectedService !== "All") {
      this.serviceBool = true;
      this.successTrans();
      this.projectTrans();
      this.loadData();
      this.loadStatusCounts();
      this.loadZTransactions();
    } else {
      this.serviceBool = false;
      this.selectedService = "";
      this.successTrans();
      this.projectTrans();
      this.loadData();
      this.loadStatusCounts();
      this.loadZTransactions();
    }
  }

  //clears applied filters
  clearFilters(): void {
    this.serviceBool = false;
    this.channelBool = false;
    this.displayDate = false;
    this.selectedService = '';
    this.selectedChannel = '';
    this.selectedStatus = '';
    this.selectedStatusIntegrations = '';
    this.selectedDate = "";
    let today = new Date;
    this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-13).toISOString().slice(0,10);
    this.endDate = new Date().toISOString().slice(0,10);
    this.getDateRange();
    this.loadData();
    this.successTrans();
    this.projectTrans();
    this.loadStatusCounts();
    this.loadZTransactions();
  }

  //selects columns to export
  selectedColumns(event): void {
    this.selectionBool = true;
    this.selectionOnBool = true;
    this.mandatoryColumns = event;
    let exportEntries = [];
    this.transactions.map(item => {
      let container = {};
      this.mandatoryColumns.map(col => {
        container[col] = item[this.columnsJson[col]];
        exportEntries.push(container);
      })
    })
    let entries = this.getUniqueListBy(exportEntries, 'CreatedOn');
    this.dataToExport = entries;
  }

  exportDataMandatory(): void {
    this.selectionOnBool = false;
    let exportEntries = [];
    this.transactions.map(item => {
      if (item["TRANSACTIONRESPONSE"] == "00") {
        item["TRANSACTIONRESPONSE"] = "successful";
      } else if (item["TRANSACTIONRESPONSE"] == "01") {
        item["TRANSACTIONRESPONSE"] = "failed";
      } else {
        item["TRANSACTIONRESPONSE"] = "pending";
      }
      let container = {};
      this.mandatoryColumns.map(col => {
        container[col] = item[this.columnsJson[col]];
        exportEntries.push(container);
      })
    })
    let entries = this.getUniqueListBy(exportEntries, 'CreatedOn');
    this.dataToExport = entries;
  }

  //exports predefined columns to pdf
  exportMandatoryPDF(): void {
    this.mandatoryColumns = this.mandatoryColumns;
    this.exportTitle = "zamtel-transactions.pdf";
    this.columnsTransactions = this.mandatoryColumns;
    this.columnsRows = this.transactions.map(item => {
      let container = [];
      this.mandatoryColumns.map(col => {
        container.push(item[this.columnsJson[col]]);
      })
      return (container);
    })
    this.exportToPDF(this.columnsTransactions, this.columnsRows, this.exportTitle);
  }

  exportToPDF(cols, rows, title): void {
    this._dataExportationService.exportToPdf(cols, rows, title);
  }

  private getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  //exports transactions data into xlsx
  exportXlsx(dataArray, title): void {
    this._dataExportationService.exportDataXlsx(dataArray, title);
  }

  //retrieves successful, pending, and failed transaction counts
  loadStatusCounts(): void {
    let model = {
      query: "VIEW_DASHBOARD_SUCCESSFUL_AND_FAILED_TXN",
      data: {
        TO: this.endDate,
        FROM: this.startDate
      }
    };
    if (this.projectCode) {
      model.data["PROJECT_CODE"] = this.projectCode;
    }
    if (this.selectedChannel) {
      model.data["CHANNEL_CODE"] = this.selectedChannel;
    }
    if (this.selectedService) {
      model.data["SERVICE_ID"] = this.selectedService;
    }
    this.loadInfoPanel(model);
  }

  private loadInfoPanel(model): void {
    this._httpService.postDb(model).subscribe(res => {
      if(res['status'] === 200) {
        this.successCount = typeof(res['data'][0]['TOTAL_SUCCESS_COUNT']) == 'string' ? Number(res['data'][0]['TOTAL_SUCCESS_COUNT']) : res['data'][0]['TOTAL_SUCCESS_COUNT'];
        this.failedCount = typeof(res['data'][0]['TOTAL_FAILED_COUNT']) == 'string' ? Number(res['data'][0]['TOTAL_FAILED_COUNT']) : res['data'][0]['TOTAL_FAILED_COUNT'];
        this.pendingCount = typeof(res['data'][0]['TOTAL_PENDING_COUNT']) == 'string' ? Number(res['data'][0]['TOTAL_PENDING_COUNT']) : res['data'][0]['TOTAL_PENDING_COUNT'];
      }
    })
  }

  //navigates to single transaction view
  view(element): void {
    this.router.navigate(['reports/view-zamtel-transaction/', element.ID]);
  }
}
