import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { DataExportationService } from '../../shared/data-exportation.service';
import { HttpService } from '../../shared/http.service';
import { ColumnItem } from '../../shared/models/column/column-item';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss']
})
export class AllTransactionsComponent implements OnInit {

  availableChannels: any[];
  availableProjects: any[];
  availableServices: any[];
  cardTitle: string;
  channelObject: any = {};
  checkedColumn;
  ColumnItem: ColumnItem;
  columnsToExport: string[] = [];
  columnsTransactions: string[];
  columnsRows: any[];
  columnsJson: any = {};
  channelBool: boolean = false;
  dataToExport: any[];
  displayColumns: any[];
  displayDate: boolean = false;
  endDate: string;
  exportTitle: string;
  failCount: number;
  filters: any[] = [
    {text: "success", value: "00"},
    {text: "failed", value: "01"}
  ];
  indicatedColumns: string[];
  listOfDisplayData: any[];
  loading: boolean = true;
  mandatoryColumns: any[] = ["ESB Reference ID", "Service Name", "Channel Name", "Transaction Status", "Transaction Amount", "CreatedOn"];
  page: number = 1;
  pendingCount: number;
  perPage: number = 100;
  project: string;
  projectBool: boolean = false;
  projectObject: any = {};
  startDate: string;
  selectedChannel: string;
  selectedDate: any;
  serviceObject: any = {};
  selectedService: string;
  selectionOnBool: boolean = false;
  serviceBool: boolean = false;
  successCount: number;
  total: number;
  transactions: any[];
  transBool: boolean = false;
  transStatus: string;
  visible: boolean;

  constructor(
    private _dataExportationService: DataExportationService,
    private _httpService: HttpService,
    private router: Router
  ) {
    let today = new Date;
    this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-13).toISOString().slice(0,10);
    this.endDate = new Date().toISOString().slice(0,10);
   }

  ngOnInit(): void {
    this.loadData();
    this.loadChannels();
    this.loadProjects();
    this.loadServices();
    this.loadStatusTotals();
  }

  //retrieves available channels
  loadChannels(): void {
    let model = {
      query: "GET_CHANNELS_QUERY",
      data: {}
    };
    this._httpService.postDb(model).subscribe(res => {
      if (res['status'] == 200) {
        this.availableChannels = res['data'];
        this.availableChannels.map(channel => {
          this.channelObject[channel['CONSUMER_KEY']] = channel['CHANNEL_NAME'];
        })
      }
    })
  }

  //retrieves available projects
  loadProjects(): void {
    let model = {
      query: "GET_PROJECTS_QUERY",
      data: {}
    };
    this._httpService.postDb(model).subscribe(res => {
      if (res['status'] == 200) {
        this.availableProjects = res['data'];
        this.availableProjects.map(item => {
          this.projectObject[item['PROJECT_ABBREVIATION']] = item['PROJECT_NAME'];
        });
      }
    })
  }

  //retrieves available services
  loadServices(): void {
    let model = {
      query: "GET_SERVICES_QUERY",
      data: {}
    };
    this._httpService.postDb(model).subscribe(res => {
      if (res['status'] == 200) {
        this.availableServices = res['data'];
        this.availableServices.map(service => {
          this.serviceObject[service['ID']] = service['SERVICE_NAME'];
        })
      }
    })
  }
  
  /** retrieves failed and successful transactions */
  loadStatusTotals(): void {
    let model = {
      query: "VIEW_DASHBOARD_SUCCESSFUL_AND_FAILED_TXN",
      data: {
        TO: this.endDate,
        FROM: this.startDate
      }
    }
    if (this.project) {
      model.data["PROJECT_CODE"] = this.project;
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
        this.failCount = typeof(res['data'][0]['TOTAL_FAILED_COUNT']) == 'string' ? Number(res['data'][0]['TOTAL_FAILED_COUNT']) : res['data'][0]['TOTAL_FAILED_COUNT'];
        this.pendingCount = typeof(res['data'][0]['TOTAL_PENDING_COUNT']) == 'string' ? Number(res['data'][0]['TOTAL_PENDING_COUNT']) : res['data'][0]['TOTAL_PENDING_COUNT'];
      }
    })
  }

  private postDBTransactions(model) {
    this._httpService.postDb(model).subscribe(res => {
      if(res['status'] === 200) {
        this.loading = false;
        this.transactions = res['data'];
        this.total = Number(res['totalResults']);
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
          }
        });
        this.displayColumns = Object.keys(this.columnsJson);
        this.loading = false;
        this.exportDataMandatory();
        this.loadStatusTotals();
      }
    })
  }

  //retrieves all transactions
  loadData(): void {
    this.loading = true;
    let model = {
      query:"GET_TRANSACTIONS",
      data:{
        PAGE:this.page - 1,
        SIZE:this.perPage,
        TO: this.endDate,
        FROM: this.startDate
      }
    };
    this.cardTitle = "All Transactions";
    if (this.project) {
      model.data["PROJECT_CODE"] = this.project;
      this.cardTitle = `${this.project}  Transactions`;
    }
    if (this.selectedService) {
      model.data["SERVICE_ID"] = this.selectedService;
      this.cardTitle = `${this.selectedService} Transactions`;
    }
    if (this.selectedChannel) {
      model.data["CHANNEL_CODE"] = this.selectedChannel;
      this.cardTitle = `${this.selectedChannel} Transactions`;
    }
    if (this.transStatus) {
      model.data["TRANSACTION_STATUS"] = this.transStatus;
      this.cardTitle = `${this.transStatus} Transactions`;
    }
    this.postDBTransactions(model);
  }

  //updates request body
  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.perPage = pageSize;
    this.loadData();
  }


  //selects columns to export to xlsx
  selectedColumns(event): void {
    this.selectionOnBool = true;
    this.indicatedColumns = event;
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

  //exports transactions to xlsx
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

  exportXLSX(dataArray, title): void {
    this._dataExportationService.exportDataXlsx(dataArray, title);
    this.loadData();
  }

  /** exports transactions to pdf */
  exportTransactionsPDF(): void {
    this.mandatoryColumns = this.mandatoryColumns;
    this.exportTitle = "all-transactions";
    this.columnsTransactions = this.mandatoryColumns;
    this.columnsRows = this.transactions.map(trans => {
      let container = [];
      this.mandatoryColumns.map(col => {
        container.push(trans[this.columnsJson[col]]);
      });
      return container;
    })
    this.exportToPDF(this.columnsTransactions, this.columnsRows, this.exportTitle);
  }

  exportToPDF(cols, rows, title): void {
    this._dataExportationService.exportToPdf(cols, rows, title);
  }

  //navigates to single transaction view
  viewTransaction(element): void {
    this.router.navigate(['/transactions/view-transaction/', element.ID]); 
  }

  //retrieves transactions by project
  projectData(event): void {
    this.projectBool = true;
    this.project = event;
    this.loadData();
  }

  //retrieves transactions by service
  serviceData(event): void {
    this.serviceBool = true;
    this.selectedService = event;
    this.loadData();
  }

  //retrieves transactions by channel
  channelTransData(event): void {
    this.channelBool = true;
    this.selectedChannel = event;
    this.loadData();
  }

  //retrieves transactions by indicated date range
  onChange(event): void {
    this.displayDate = true;
    this.startDate = new Date(event[0]).toISOString().slice(0,10);
    this.endDate = new Date(event[1]).toISOString().slice(0,10);
    this.loadData();
  }

  
  transactionStatus(event): void {
    this.transStatus = event;
    this.transBool = true;
    this.loadData();
  }

  resetFilters(): void {
    this.projectBool = false;
    this.channelBool = false;
    this.serviceBool = false;
    this.transBool = false;
    this.displayDate = false;
    this.project = '';
    this.selectedChannel = '';
    this.selectedDate = '';
    this.selectedService = '';
    this.transStatus = '';
    let today = new Date;
    this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-13).toISOString().slice(0,10);
    this.endDate = new Date().toISOString().slice(0,10);
    this.loadData();
  }
}
