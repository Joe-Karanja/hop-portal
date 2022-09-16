import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Chart } from 'chart.js';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';

import { DataExportationService } from '../../shared/data-exportation.service';
import { GlobalService } from '../../shared/global.service';
import { HttpService } from '../../shared/http.service';


@Component({
  selector: 'app-school-pay',
  templateUrl: './school-pay.component.html',
  styleUrls: ['./school-pay.component.scss']
})
export class SchoolPayComponent implements OnChanges, OnInit {

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
  exportTitle: string;
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
  failedBool: boolean = false;
  failedCount: number;
  failedIntegrations: any[] = [];
  failedServices: any[] = [];
  indicatedColumns: any[] = [];
  integrationsChart;
  loading: boolean = false;
  mandatoryColumns: string[] = ["ESB Reference ID", "Service Name", "Channel Name", "Transaction Status", "Transaction Amount", "Bank Branch", "CreatedOn"];
  page: number = 1;
  pendingCount: number;
  pendingTransactions: number[];
  perPage: number = 100;
  projectCode: any = 'SCHPAY001';
  schools: any[];
  serviceBool: boolean = false;
  selectedChannel: string;
  selectedService: string;
  selectedDate: string;
  selectedStatus: any = '';
  selectedStatusIntegrations: any = '';
  selectionBool: boolean = false;
  selectionOnBool: boolean = false;
  schoolCode: string;
  schoolCodeBool: boolean = false;
  schoolContainer: any = {};
  selections: string[] = ["Successful", "Failed"];
  servicesChart;
  showButtons: boolean = false;
  startDate: string;
  successBool: boolean = false;
  successCount: number;
  successChart;
  successIntegrations: any[] = [];
  successServices: number;
  successfulTrans: number[];
  total: number;
  transactions: any[];
  transactionsColumns: string[];
  transactionsRows: any[];
  unsuccessfulTrans: number[];

  constructor(
    private _dataExportationService: DataExportationService,
    private _globalService: GlobalService,
    private _httpService: HttpService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    let today = new Date;
    this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-13).toISOString().slice(0,10);
    this.endDate = new Date().toISOString().slice(0,10);
  }

  ngOnInit(): void {
    this.loadData();
    this.projectTrans();
    this.successTrans();
    this.loadTransactions();
    this.getServices();
    this.getChannels();
    this.getDateRange();
    this.getSchools();
    this.loadStatusTotals();

    this.cardTitle = 'School Pay Transactions';
    
  }

  ngOnChanges(): void {
    this.loadStatusTotals();
  }

  getDateRange(): void {
    this.daysArray = this._globalService.enumerateDaysBetweenDates(this.startDate, this.endDate); 
  }


  private postStoredIntegrations(model) {
    this._httpService.postStored(model).subscribe(res => {
      if(res['status'] === 200) {
        let container = {};
        let labels = [];
        let schoolPay = [];
        res.data.map(item => {
          container[item["PROJECT_NAME"]] = item["DATASET"];
          item['DATASET'].map(day => {
            labels.push(day['days']);
          })
        });
        if (container["School Pay Integrations"]) {
          container["School Pay Integrations"].map(it => {
            if (this.selectedStatusIntegrations == "") {
              schoolPay.push(it['sum']);
            } else if (this.selectedStatusIntegrations == "Successful") {
              schoolPay.push(it['total_successs_value'])
            } else if (this.selectedStatusIntegrations == "Failed") {
              schoolPay.push(Number(it["sum"]) - Number(it["total_successs_value"]))
            }
            
          });
        }
        this.channelLabels = Array.from(new Set(labels));
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
                label: 'School Pay Integrations',
                data: schoolPay,
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
    });
  }

  private plotSuccessGraph(): void {
    let cntx = document.getElementById("successCanvas") as HTMLCanvasElement;
    if (this.successChart) {
      this.successChart.destroy();
    }
    let dataSet = [
      {
        label: 'Successful Transactions',
        data: this.successfulTrans,
        backgroundColor: "#14314f",
        borderColor: "#14314f",
        borderWidth: 0
      },
      {
        data: this.unsuccessfulTrans,
        label: "Failed Transactions",
        backgroundColor: "#868484",
        borderColor: "#868484",
        borderWidth: 0
      }
    ];
    // if (this.pendingTransactions.length > 0) {
    //   dataSet.push({
    //     data: this.pendingTransactions,
    //     label: "Pending Transactions",
    //     backgroundColor: "#387CA6",
    //     borderColor: "#387CA6",
    //     borderWidth: 0
    //   })
    // }
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
    this.successfulTrans = [];
    this.unsuccessfulTrans = [];
    this.pendingTransactions = [];
    this._httpService.postDb(model).subscribe(res => {
      if (res['status'] === 200) {
        let found = false;
        let labels = [];
        let successfulTrans = [];
        let transData = res['data'];
        let newTransData = [];
        let unsuccessfulTrans = [];
        let pendingTrans = [];
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
          pendingTrans.push(item["pending_count"]);
        })
        
        this.barChartLabels = labels;
        this.successfulTrans = successfulTrans;
        this.unsuccessfulTrans = unsuccessfulTrans;
        this.pendingTransactions = pendingTrans;
        this.plotSuccessGraph();
      }
    });
  }

  private postDBServices(model) {
    this._httpService.postDb(model).subscribe(res => {
      if (res['status'] === 200) {
        let labels = [];
        let data = [];
        let counts = [];
        res['data'].map(item => {
          labels.push(item['FIELD12']);
          if (this.selectedStatus == "") {
            data.push(Number(item['TOTAL_TRANS_VALUE']));
            counts.push(Number(item['TOTAL_TRANS_COUNT']));
          } else if (this.selectedStatus == "Successful") {
            data.push(Number(item["TOTAL_SUCCESS_VALUE"]));
            counts.push(Number(item["TOTAL_SUCCESS_COUNT"]))
          } else if (this.selectedStatus == "Failed") {
            data.push(Number(item['TOTAL_TRANS_VALUE']) - Number(item["TOTAL_SUCCESS_VALUE"]));
            counts.push(Number(item['TOTAL_TRANS_COUNT']) - Number(item["TOTAL_SUCCESS_COUNT"]));
          }
        });

        let footer = (tooltipItems) => {
          let count = 0
          tooltipItems.forEach(toooltipItem => {
            count += toooltipItem.parsed.y;
          });
          return "count: " + count;
        }
        let cntx = document.getElementById("servicesSumCanvas") as HTMLCanvasElement;
        if (this.servicesChart) {
          this.servicesChart.destroy()
        }
        this.servicesChart = new Chart(cntx.getContext('2d'), {
          type: "doughnut",
          data: {
            labels: labels,
            datasets: [{
              data: counts,
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
                    footer: footer,
                  }
                }
              }
          }
        })
      }
    })
  }

  //retrieves available school names
  getSchools(): void {
    let model = {
      query: "GET_DISTINCT_SCHOOLS",
      data: { }
    };
    this._httpService.postDb(model).subscribe(res => {
      if (res["status"] === 200) {
        this.schools = res["data"];
      }
    })
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
    if (this.schoolCode) {
      model.data["SCHOOL_NAME"] = this.schoolCode;
    }
    this.postDBServices(model);
  }

  //plots transactions by integration
  projectTrans(): void {
    if (!this.serviceBool && !this.channelBool && !this.schoolCodeBool) {
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
    } else if (!this.serviceBool && this.channelBool && !this.schoolCodeBool) {
      let model = {
        procedure:"A_SP_GET_ALL_COMBINED_DATA",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            V_PROJECT_CODE:this.projectCode,
            V_CHANNEL_KEY:this.selectedChannel,
            V_SERVICE_ID: "",
            C_1:""
        }
      };
      this.postStoredIntegrations(model);
    } else if (this.serviceBool && !this.channelBool && !this.schoolCodeBool) {
      let model = {
        procedure:"A_SP_GET_PROJECTS_BY_SERVICE",
        parameters:{
            V_FROM_DATE:this.startDate,
            V_TO_DATE:this.endDate,
            V_PROJECT_CODE:this.projectCode,
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
    }
    if (this.selectedService) {
      model.data["SERVICE_ID"] = this.selectedService;
    }
    if (this.selectedChannel) {
      model.data["CHANNEL_CODE"] = this.selectedChannel;
    }
    if (this.schoolCode) {
      model.data["SCHOOL_NAME"] = this.schoolCode;
    }
    this.postDBValues(model);
  }

  private postTransactions(model): void {
    this.loading = true;
    this._httpService.postDb(model).subscribe(res => {
      if (res['status'] === 200) {
        this.total = res['totalResults'];
        this.transactions = res['data'];
        if (this.transactions.length > 0) {
          this.showButtons = true;
        } else {
          this.showButtons = false;
        }
        let columns = [];
        this.transactions.map(it => {
          Object.keys(it).map(item => {
            columns.push(item)
          })
        });
        this.columnsToExport = Array.from(new Set(columns));
        this.columnsToExport.map(item => {
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
            case "CHANNELDEPOSITORBRANCH":
            this.columnsJson["Bank Branch"] = "CHANNELDEPOSITORBRANCH";
            break;
            case "PROJECTCODE":
              this.columnsJson["Project Code"] = "PROJECTCODE";
              break;
            case "TRANSACTIONRESPONSE":
              this.columnsJson["Transaction Status"] = "TRANSACTIONRESPONSE";
            case "TRANSACTIONAMOUNT":
              this.columnsJson["Transaction Amount"] = "TRANSACTIONAMOUNT";
              break;
            case "TRANSACTIONCHARGEAMOUNT":
              this.columnsJson["Transaction Charge"] = "TRANSACTIONCHARGEAMOUNT";
              break;
            case "PRIMARYACCOUNTNUMBER":
              this.columnsJson["Primary Account Number"] = "PRIMARYACCOUNTNUMBER";
              break;
            case "PROCESSINGCODE":
              this.columnsJson["Processing Code"] = "PROCESSINGCODE";
              break;
            case "PAIDBYMOBILENUMBER":
              this.columnsJson["Client Number"] = "PAIDBYMOBILENUMBER";
              break;
            case "PAIDBY":
              this.columnsJson["Client Name"] = "PAIDBY";
              break;
            case "TRANSACTIONNARRATION":
              this.columnsJson["Narration"] = "TRANSACTIONNARRATION";
              break;
            case "CREATED_ON":
              this.columnsJson["CreatedOn"] = "CREATED_ON";
              break;
            case "DEBITACCOUNT":
              this.columnsJson["Debit Account"] = "DEBITACCOUNT";
              break;
            case "CREDITACCOUNT":
              this.columnsJson["Credit Account"] = "CREDITACCOUNT";
              break;
            case "STUDENTPAYMENTCODE":
              this.columnsJson["Student Payment Code"] = "STUDENTPAYMENTCODE";
              break;
            case "SCHOOLNAME":
              this.columnsJson["School Name"] = "SCHOOLNAME";
              break;
            case "PAIDBY":
              this.columnsJson["Paid By"] = "PAIDBY";
              break;
            case "PAIDBYMOBILENUMBER":
            this.columnsJson["Paid By Phone Number"] = "PAIDBYMOBILENUMBER";
              break;
            case "FIRSTNAME":
              this.columnsJson["First Name"] = "FIRSTNAME";
                break;
            case "MIDDLENAME":
              this.columnsJson["Middle Name"] = "MIDDLENAME";
                break;
          }
        });
        this.displayColumns = Object.keys(this.columnsJson);
        this.loading = false;
        this.exportDataMandatory();
      } else {
        this.toastr.error("School Pay transactions cannot be retrieved at the moment", "Error!")
      }
    })
  }

  //retrieves school pay transactiosn data
  loadTransactions(): void {
    let model = {
      query: "GET_SCHOOL_PAY_TRANSACTIONS",
        data: {
          PAGE: this.page - 1,
          SIZE: this.perPage,
          TO: this.endDate,
          FROM: this.startDate
        }
    }
    if (this.selectedService) {
      model.data["SERVICE_ID"] = this.selectedService;
    }
    if (this.selectedChannel) {
      model.data["CHANNEL_CODE"] = this.selectedChannel;
    }
    if (this.schoolCode) {
      model.data["SCHOOL_NAME"] = this.schoolCode
    }
    this.postTransactions(model);
  }

  //updates request body
  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.perPage = pageSize;
    this.loadTransactions();
  }

  //displays service specific transactions
  onServiceSelect(event): void {
    this.selectedService = event;
    if (this.selectedService !== "All") {
      this.serviceBool = true;
      this.loadTransactions();
      this.loadData();
      this.successTrans();
      this.projectTrans();
      this.loadStatusTotals();
    } else {
      this.serviceBool = false;
      this.selectedService = '';
      this.loadTransactions();
      this.loadData();
      this.successTrans();
      this.projectTrans();
      this.loadStatusTotals();
    }
    
  }

  //displays channel specific transactions
  onChannelSelect(event): void {
    this.selectedChannel = event;
    if (this.selectedChannel !== "All") {
      this.channelBool = true;
      this.loadTransactions();
      this.loadData();
      this.successTrans();
      this.projectTrans();
      this.loadStatusTotals();
    } else {
      this.channelBool = false;
      this.selectedChannel = "";
      this.loadTransactions();
      this.loadData();
      this.loadStatusTotals();
      this.successTrans();
      this.projectTrans();
      this.loadStatusTotals();
    }
    
  }

  //displays date range specific transactions
  onDateSelect(event): void {
    this.startDate = new Date(event[0]).toISOString().slice(0,10);
    this.endDate = new Date(event[1]).toISOString().slice(0,10);
    this.displayDate = true;
    this.getDateRange();
    this.loadData();
    
    this.projectTrans();
    this.successTrans();
    this.loadTransactions();
    this.loadStatusTotals();
  }

  //displays school code specific transactions
  onCodeSelect(event): void {
    this.schoolCode = event;
    if (this.schoolCode !== "All") {
      this.schoolCodeBool = true;
      this.loadTransactions();
      this.loadData();
      this.successTrans();
      this.loadStatusTotals();
      this.loadStatusTotals()
    } else {
      this.schoolCodeBool = false;
      this.schoolCode = "";
      this.loadData();
      this.loadTransactions();
      this.successTrans();
      this.loadStatusTotals();
    }
    
  }

  //selects columns to export to xlsx
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
    this.dataToExport = entries
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
    this.dataToExport = entries
  }

  private getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  //exports transactions data to xlsx
  exportXlsx(dataArray, title): void {
    this._dataExportationService.exportDataXlsx(dataArray, title);
  }

  //exports school pay transactions to pdf
  exportMandatoryPDF(): void {
    this.mandatoryColumns = this.mandatoryColumns;
    this.exportTitle = "school-pay-transactions.pdf";
    this.transactionsColumns = this.mandatoryColumns;
    this.transactionsRows = this.transactions.map(item => {
      let container = [];
      this.mandatoryColumns.map(col => {
        container.push(item[this.columnsJson[col]]);
      })
      return (container);
    })
    this.exportToPDF(this.transactionsColumns, this.transactionsRows, this.exportTitle);
  }

  exportToPDF(cols, rows, title): void {
    this._dataExportationService.exportToPdf(cols, rows, title);
  }

  //retrieves available services
  getServices(): void {
    let model = {
      query: "GET_SCHOOL_PAY_SERVICES_TRANS_QUERY",
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

  //clears applied filters
  clearFilters(): void {
    this.serviceBool = false;
    this.channelBool = false;
    this.displayDate = false;
    this.schoolCode = '';
    this.schoolCodeBool = false;
    this.selectedDate = '';
    this.selectedService = '';
    this.selectedChannel = '';
    this.selectedStatus = '';
    this.selectedStatusIntegrations = '';
    let today = new Date;
    this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-13).toISOString().slice(0,10);
    this.endDate = new Date().toISOString().slice(0,10);
    this.getDateRange();
    this.loadData();
    this.loadTransactions();
    this.successTrans();
    this.projectTrans();
    this.loadStatusTotals();
  }

  //navigates to single transaction view
  view(element): void {
    this.router.navigate(['transactions/school-pay-transactions/', element.ID]);
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

  /**load status counts i.e pending, success, failed */
  loadStatusTotals(): void {
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
    if (this.schoolCode) {
      model.data["SCHOOL_NAME"] = this.schoolCode;
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
}
