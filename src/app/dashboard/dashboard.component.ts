import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

//import { saveAs } from 'file-saver';

import { ToastrService } from 'ngx-toastr';

import { ChartLabelsService } from '../shared/chart-labels.service';
import { DataExportationService } from '../shared/data-exportation.service';
import { GlobalService } from '../shared/global.service';
import { HttpService } from '../shared/http.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  availableChannels: any[];
  availableProjects: any[];
  availableServices: any[];
  buttonTitle: string = "View Transactions Value";
  card1;
  card2;
  card3;
  channelsChart;
  commarize;
  columnsJson: any = {};
  columnsToExport: any;
  countChart: any;
  countShow: boolean = false;
  countTitle: string = "View Transaction Values";
  dataset;
  dataToExport: any[];
  datesArray: string[];
  dateRange: any[];
  displayDate: boolean = false;
  displayColumns: any;
  doughnutData: any[];
  doughnutLabels: string[];
  doughnutType: string;
  endDate: string;
  exportTitle: string;
  graphC: any;
  loading: boolean = false;
  page: number = 1;
  perPage: number = 1000;
  period: string = 'Daily';
  project: string;
  projectBool: boolean = false;
  projectCode: string;
  projectObject: any = {};
  channelBool: boolean = false;
  channelObject: any = {};
  integrationsChart;
  mandatoryColumns: string[] = ["ID", "ESB Reference ID", "Service Name", "Channel Name", "Project Code", "Transaction Status", "Transaction Amount", "Transaction Charge", "Primary Account Number", "Processing Code", "Client Number", "Client Name", "Narration", "CreatedOn", "Debit Account", "Credit Account"];
  selectedService: string;
  selectedChannel: string;
  selectedSingleChannel: string;
  selectedProject: string;
  serviceBool: boolean= false;
  servicesChart;
  serviceDataChart: any;
  serviceLabels: string;
  serviceObject: any = {};
  successCountChart;
  successValueChart;
  showingChannel: any;
  showingProject: any;
  showingService: any;
  successCount: number;
  total: number;
  transactions: any[];
  transactionsColumns: string[];
  transactionsRows: any[];
  failCount: number;
  // reportTypes: string[] = ['Hourly', 'Daily', 'Monthly'];
  reportTypes: string[] = ['Daily', 'Monthly'];
  report;
  selectedDate;
  toggleValue: boolean = false;
  transactionsCount: number;
  transactionsValue: number;
  transValue: number;
  transCount: number;
  transSuccessful: number;
  transUnsuccessful: number;
  valueData: any;
  startDate: string;
  toggleCount: boolean = false;

  constructor(
    private _chartService: ChartLabelsService,
    private _dataExportationService: DataExportationService,
    private _httpService: HttpService,
    private router: Router,
    private toastr: ToastrService
  ) {
    let today = new Date;
    this.endDate = new Date().toISOString().slice(0,10);
    this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-13).toISOString().slice(0,10);
  }

  ngOnInit(): void {
    // this.loadData();
    // this.loadChannels();
    // //this.loadServices();
    // //this.loadProjects();
    // this.getTransactions();
  }

  //retrieves available channels
  // loadChannels(): void {
  //   let model = {
  //     query: "GET_CHANNELS_QUERY",
  //     data: {}
  //   };
  //   this._httpService.postDb(model).subscribe(res => {
  //     if(res['status'] === 200) {
  //       this.availableChannels = res['data'];
  //       this.availableChannels.map(channel => {
  //         this.channelObject[channel['CONSUMER_KEY']] = channel['CHANNEL_NAME'];
  //       })
  //     }
  //   })
  // }

  // private serviceLoader(model): void {
  //   this._httpService.postDb(model).subscribe(res => {
  //     if (res['status'] === 200) {
  //       this.availableServices = res['data'];
  //       this.availableServices.map(service => {
  //         this.serviceObject[service['ID']] = service['SERVICE_NAME'];
  //       })
  //     }
  //   })
  // }

  //retrieves available services
  // loadServices(): void {
  //   if (this.projectBool) {
  //     let model = {
  //       query: "GET_SERVICES_QUERY",
  //       data: {
  //         PROJECT_ID: this.projectCode
  //       }
  //     };
  //     this.serviceLoader(model);
  //   } else {
  //     let model = {
  //       query: "GET_SERVICES_QUERY",
  //       data: {}
  //     };
  //     this.serviceLoader(model);
  //   }
  // }

  //retrievs available projects
  // loadProjects(): void {
  //   let model = {
  //     query: "GET_PROJECTS_QUERY",
  //     data: {}
  //   };
  //   this._httpService.postDb(model).subscribe(res => {
  //     if (res['status'] === 200) {
  //       this.availableProjects = res['data'];
  //       this.availableProjects.map(item => {
  //         this.projectObject[item['PROJECT_ABBREVIATION']] = item['PROJECT_NAME'];
  //       });
  //     }
  //   })
  // }

  //toggles count and value transaction views
  // toggleCountValue(): void {
  //   this.toggleCount = !this.toggleCount;
  //   console.log(this.toggleCount);
  // }
  

  // private postDBTransactions(model) {
  //   this._httpService.postDb(model).subscribe(res => {
  //     if(res['status'] === 200) {
  //       this.loading = false;
  //       this.transactions = res['data'];
  //       this.total = Number(res['totalResults']);
  //       let columns = [];
  //       this.transactions.map(it => {
  //         Object.keys(it).map(item => {
  //           columns.push(item)
  //         })
  //       });
  //       this.columnsToExport = Array.from(new Set(columns));
  //       this.columnsToExport.map(item => {
  //         switch(item) {
  //           case "ID":
  //             this.columnsJson["ID"] = "ID";
  //             break;
  //           case "ESBREFID":
  //             this.columnsJson["ESB Reference ID"] = "ESBREFID";
  //             break;
  //           case "SERVICENAME":
  //             this.columnsJson["Service Name"] = "SERVICENAME";
  //             break;
  //           case "CHANNELNAME":
  //             this.columnsJson["Channel Name"] = "CHANNELNAME";
  //             break;
  //           case "CHANNELREFID":
  //             this.columnsJson["Channel Reference ID"] = "CHANNELREFID";
  //             break;
  //           case "PROJECTCODE":
  //             this.columnsJson["Project Code"] = "PROJECTCODE";
  //             break;
  //           case "TRANSACTIONRESPONSE":
  //             this.columnsJson["Transaction Status"] = "TRANSACTIONRESPONSE";
  //           case "TRANSACTIONAMOUNT":
  //             this.columnsJson["Transaction Amount"] = "TRANSACTIONAMOUNT";
  //             break;
  //           case "TRANSACTIONCHARGEAMOUNT":
  //             this.columnsJson["Transaction Charge"] = "TRANSACTIONCHARGEAMOUNT";
  //             break;
  //           case "PRIMARYACCOUNTNUMBER":
  //             this.columnsJson["Primary Account Number"] = "PRIMARYACCOUNTNUMBER";
  //             break;
  //           case "PROCESSINGCODE":
  //             this.columnsJson["Processing Code"] = "PROCESSINGCODE";
  //             break;
  //           case "PAIDBYMOBILENUMBER":
  //             this.columnsJson["Client Number"] = "PAIDBYMOBILENUMBER";
  //             break;
  //           case "PAIDBY":
  //             this.columnsJson["Client Name"] = "PAIDBY";
  //             break;
  //           case "TRANSACTIONNARRATION":
  //             this.columnsJson["Narration"] = "TRANSACTIONNARRATION";
  //             break;
  //           case "CREATED_ON":
  //             this.columnsJson["CreatedOn"] = "CREATED_ON";
  //             break;
  //           case "DEBITACCOUNT":
  //             this.columnsJson["Debit Account"] = "DEBITACCOUNT";
  //             break;
  //           case "CREDITACCOUNT":
  //             this.columnsJson["Credit Account"] = "CREDITACCOUNT";
  //             break;
  //         }
  //       });
  //       this.displayColumns = Object.keys(this.columnsJson);
  //     }
  //   })
  // }

  //load transactions
  // getTransactions(): void {
  //   let model = {
  //     query:"GET_TRANSACTIONS",
  //       data:{
  //         PAGE:this.page - 1,
  //         SIZE:this.perPage,
  //         TO: this.endDate,
  //         FROM: this.startDate,
  //       }
  //   }
  //   if (this.projectCode){
  //     model.data["PROJECT_CODE"] = this.projectCode;
  //   }
  //   if (this.selectedChannel){
  //     model.data["CHANNEL_CODE"] = this.selectedChannel;
  //   }
  //   if (this.selectedService) {
  //     model.data["SERVICE_ID"] = this.selectedService;
  //   }
  //   this.postDBTransactions(model);
  // }

  //exports all transactions in xlsx
  // exportTransactions(): void {
  //   let transToExport = [];
  //   this.transactions.map(trans => {
  //     let container = {};
  //     this.mandatoryColumns.map(col => {
  //       container[col] = trans[this.columnsJson[col]];
  //       transToExport.push(container);
  //     })
  //   });
  //   let entries = this.getUniqueListBy(transToExport, "ID");
  //   this.dataToExport = entries;
  //   this.exportTransXLSX(this.dataToExport, "transactions");
  // } 

  // exportTransXLSX(dataArray, title): void {
  //   this._dataExportationService.exportDataXlsx(dataArray, title);
  // }

  // private getUniqueListBy(arr, key) {
  //   return [...new Map(arr.map(item => [item[key], item])).values()]
  // }

  //exports transactions to PDF
  // exportTransactionsPDF(): void {
  //   this.mandatoryColumns = this.mandatoryColumns;
  //   this.exportTitle = "All-transactions.pdf";
  //   this.transactionsColumns = this.mandatoryColumns;
  //   this.transactionsRows = this.transactions.map(trans => {
  //     let container = [];
  //     this.mandatoryColumns.map(col => {
  //       container.push(trans[this.columnsJson[col]]);
  //     })
  //     return container;
  //   })
  //   this.exportToPDF(this.transactionsColumns, this.transactionsRows, this.exportTitle);
  // }

  // exportToPDF(cols, rows, title): void {
  //   this._dataExportationService.exportToPdf(cols, rows, title);
  // }

  //exports transactions by channels in xslsx
  // exportTransactionsByChannels(): void {
  // }

  // private loadInfoPanel(model): void {
  //   this._httpService.postDb(model).subscribe(res => {
  //     //console.log("info panel results: ", res);
  //     if(res['status'] === 200) {
  //       let successValue = typeof(res['data'][0]['TOTAL_SUCCESS_VALUE']) == 'string' ? Number(res['data'][0]['TOTAL_SUCCESS_VALUE']) : res['data'][0]['TOTAL_SUCCESS_VALUE'];
  //       let failValue = typeof(res['data'][0]['TOTAL_FAILED_VALUE']) == 'string' ? Number(res['data'][0]['TOTAL_FAILED_VALUE']) : res['data'][0]['TOTAL_FAILED_VALUE'];
  //       this.successCount = typeof(res['data'][0]['TOTAL_SUCCESS_COUNT']) == 'string' ? Number(res['data'][0]['TOTAL_SUCCESS_COUNT']) : res['data'][0]['TOTAL_SUCCESS_COUNT'];
  //       this.failCount = typeof(res['data'][0]['TOTAL_FAILED_COUNT']) == 'string' ? Number(res['data'][0]['TOTAL_FAILED_COUNT']) : res['data'][0]['TOTAL_FAILED_COUNT'];
  //       this.transValue = successValue + failValue;
  //       this.transCount = this.failCount + this.successCount;
  //       this.transSuccessful = Number(res['data'][0]['TOTAL_SUCCESS_VALUE']);
  //       this.transUnsuccessful = Number(res['data'][0]['TOTAL_FAILED_VALUE']);
  //     }
  //   })
  // }

  //retrieves transaction summaries
  // loadData(): void {
  //   let model = {
  //     query: "VIEW_DASHBOARD_SUCCESSFUL_AND_FAILED_TXN",
  //     data: {
  //       TO: this.endDate,
  //       FROM: this.startDate
  //     }
  //   } 
  //   if (this.projectCode) {
  //     model.data["PROJECT_CODE"] = this.projectCode;
  //   }
  //   if (this.selectedService) {
  //     model.data["SERVICE_ID"] = this.selectedService;
  //   }
  //   if (this.selectedChannel) {
  //     model.data["CHANNEL_CODE"] = this.selectedChannel;
  //   }
  //   this.loadInfoPanel(model);
  // }

  //filters report types
  // getReport(event): void {
  //   this.period = event;
  //   this.toastr.success(`${this.period} transactions retrieved`, 'Success!')
  // }

  // projectData(event): void {
  //   this.projectCode = event;
  //   if (this.projectCode !== "All") {
  //     this.projectBool = true;
  //     this.showingProject = this.projectObject[this.projectCode];
  //     this.loadData();
  //     this.loadServices();
  //   } else {
  //     this.projectBool = false;
  //     this.projectCode = "";
  //     this.loadData();
  //   }
  // }

  // serviceData(event): void {
  //   this.selectedService = event;
  //   if (this.selectedService !== "All") {
  //     this.serviceBool = true;
  //     this.showingService = this.serviceObject[this.selectedService];
  //     this.loadData();
  //   } else {
  //     this.serviceBool = false;
  //     this.selectedService = "";
  //     this.loadData();
  //   }
    
  // }

  // channelTransData(event): void {
  //   this.selectedChannel = event;
  //   if (this.selectedChannel !== "All") {
  //     this.channelBool = true;
  //     this.showingChannel = this.channelObject[this.selectedChannel];
  //     this.loadData();
  //   } else {
  //     this.channelBool = false;
  //     this.selectedChannel = "";
  //     this.loadData();
  //   }
    
  // }

  // onChange(event): void {
  //   this.displayDate = true;
  //   this.startDate = new Date(event[0]).toISOString().slice(0,10);
  //   this.endDate = new Date(event[1]).toISOString().slice(0,10);
  //   this.loadData();
  // }

  // //clears filters
  // resetFilters(): void {
  //   let today = new Date;
  //   this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-13).toISOString().slice(0,10);
  //   this.endDate = new Date().toISOString().slice(0,10);
  //   this.projectBool = false;
  //   this.displayDate = false;
  //   this.channelBool = false;
  //   this.serviceBool = false;
  //   this.project = '';
  //   this.projectCode = '';
  //   this.selectedChannel = '';
  //   this.selectedService = '';
  //   this.selectedDate = '';
  //   this.selectedProject = '';
  //   this.loadData();
  //   this.loadServices();
  // }

  //navigates to diplayed dashboard transactions page
  // getTrans(): void {
  //   if (this.selectedChannel && this.selectedService && this.projectCode) {
  //     this.router.navigate(["/transactions/dashboard-transactions", {service: this.selectedService, channel: this.selectedChannel, project: this.projectCode, from: this.startDate, to: this.endDate}]);
  //   } else if (this.projectCode && this.selectedService) {
  //     this.router.navigate(["/transactions/dashboard-transactions", {project: this.projectCode, service: this.selectedService, from: this.startDate, to: this.endDate}]);
  //   }  else if (this.projectCode && this.selectedChannel) {
  //     this.router.navigate(["/transactions/dashboard-transactions", {channel: this.selectedChannel, project: this.projectCode, from: this.startDate, to: this.endDate}]);
  //   } else if (this.projectCode) {
  //     this.router.navigate(["/transactions/dashboard-transactions", {project: this.projectCode, from: this.startDate, to: this.endDate}]);
  //   } else if (this.selectedService) {
  //     this.router.navigate(["/transactions/dashboard-transactions", {service: this.selectedService, from: this.startDate, to: this.endDate}]);
  //   } else if (this.selectedChannel) {
  //     this.router.navigate(["/transactions/dashboard-transactions", {channel: this.selectedChannel, from: this.startDate, to: this.endDate}]);
  //   } else {
  //     this.router.navigate(["/transactions/dashboard-transactions", {from: this.startDate, to: this.endDate}]);
  //   }
  // }

  // getFailedTrans(): void {
  //   if (this.selectedChannel && this.selectedService && this.projectCode) {
  //     this.router.navigate(["/transactions/dashboard-transactions", {service: this.selectedService, channel: this.selectedChannel, project: this.projectCode, from: this.startDate, to: this.endDate, status: "failed"}]);
  //   } else if (this.projectCode && this.selectedService) {
  //     this.router.navigate(["/transactions/dashboard-transactions", {project: this.projectCode, service: this.selectedService, from: this.startDate, to: this.endDate, status: "failed"}]);
  //   }  else if (this.projectCode && this.selectedChannel) {
  //     this.router.navigate(["/transactions/dashboard-transactions", {channel: this.selectedChannel, project: this.projectCode, from: this.startDate, to: this.endDate, status: "failed"}]);
  //   } else if (this.projectCode) {
  //     this.router.navigate(["/transactions/dashboard-transactions", {project: this.projectCode, from: this.startDate, to: this.endDate, status: "failed"}]);
  //   } else if (this.selectedService) {
  //     this.router.navigate(["/transactions/dashboard-transactions", {service: this.selectedService, from: this.startDate, to: this.endDate, status: "failed"}]);
  //   } else if (this.selectedChannel) {
  //     this.router.navigate(["/transactions/dashboard-transactions", {channel: this.selectedChannel, from: this.startDate, to: this.endDate, status: "failed"}]);
  //   } else {
  //     this.router.navigate(["/transactions/dashboard-transactions", {from: this.startDate, to: this.endDate, status: "failed"}]);
  //   }
  // }
}
