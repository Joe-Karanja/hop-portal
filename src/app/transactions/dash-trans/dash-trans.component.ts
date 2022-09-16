import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { HttpService } from "../../shared/http.service";
import { DataExportationService } from '../../shared/data-exportation.service';

@Component({
  selector: 'app-dash-trans',
  templateUrl: './dash-trans.component.html',
  styleUrls: ['./dash-trans.component.scss']
})
export class DashTransComponent implements OnInit {

  cardTitle: string;
  columnsJson: any = {};
  columnsToExport: string[] = [];
  dataToExport: any[];
  displayColumns: any[];
  indicatedColumns: string[];
  loading: boolean = false;
  mandatoryColumns: any[] = ["ESB Reference ID", "Service Name", "Channel Name", "Transaction Status", "Transaction Amount", "CreatedOn"];
  page: number = 1;
  perPage: number = 10;
  total: number;
  transactions: any[];


  constructor(
    private _exportationService: DataExportationService,
    private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cardTitle = "Dashboard Transactions";
    this.loadTrans();
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
      }
    })
  }

  //loads dash transactions
  loadTrans(): void {
    let project = this.route.snapshot.paramMap.get("project") ? this.route.snapshot.paramMap.get("project") : false;
    let service = this.route.snapshot.paramMap.get("service") ? this.route.snapshot.paramMap.get("service") : false;
    let channel = this.route.snapshot.paramMap.get("channel") ? this.route.snapshot.paramMap.get("channel") : false;
    let startDate = this.route.snapshot.paramMap.get("from");
    let endDate = this.route.snapshot.paramMap.get("to");
    let status = this.route.snapshot.paramMap.get("status") ? this.route.snapshot.paramMap.get("status") : false

     if (project && service && channel == false) {
      let model = {
        query:"GET_TRANSACTIONS",
        data: {
          PAGE:this.page - 1,
          SIZE:this.perPage,
          TO: endDate,
          FROM: startDate,
          PROJECT_CODE: project,
          SERVICE_ID: service
        }
      };
      this.postDBTransactions(model);
    } else if (project && service && channel) {
      let model;
      if (status = false) {
        model = {
          query:"GET_TRANSACTIONS",
          data: {
            PAGE:this.page - 1,
            SIZE:this.perPage,
            TO: endDate,
            FROM: startDate,
            PROJECT_CODE: project,
            SERVICE_ID: service,
            CHANNEL_CODE: channel
          }
        };
      } else {
        model = {
          query:"GET_TRANSACTIONS",
          data: {
            PAGE:this.page - 1,
            SIZE:this.perPage,
            TO: endDate,
            FROM: startDate,
            PROJECT_CODE: project,
            SERVICE_ID: service,
            CHANNEL_CODE: channel,
            TRANSACTION_STATUS:"01"
          }
        };
      }
      this.postDBTransactions(model);
    } else if (project && service == false && channel == false) {
      let model;
      if (status == false) {
        model = {
          query:"GET_TRANSACTIONS",
          data: {
            PAGE:this.page - 1,
            SIZE:this.perPage,
            TO: endDate,
            FROM: startDate,
            PROJECT_CODE: project,
            
          }
        };
      } else {
        model = {
          query:"GET_TRANSACTIONS",
          data: {
            PAGE:this.page - 1,
            SIZE:this.perPage,
            TO: endDate,
            FROM: startDate,
            PROJECT_CODE: project,
            TRANSACTION_STATUS:"01"
          }
        };
      }
      this.postDBTransactions(model);
    } else if (project && channel && service == false) {
      let model;
      if (status == false) {
        model = {
          query:"GET_TRANSACTIONS",
          data: {
            PAGE:this.page - 1,
            SIZE:this.perPage,
            TO: endDate,
            FROM: startDate,
            PROJECT_CODE: project,
            CHANNEL_CODE: channel
          }
        };
      } else {
        model = {
          query:"GET_TRANSACTIONS",
          data: {
            PAGE:this.page - 1,
            SIZE:this.perPage,
            TO: endDate,
            FROM: startDate,
            PROJECT_CODE: project,
            CHANNEL_CODE: channel,
            TRANSACTION_STATUS:"01"
          }
        };
      }
      
      this.postDBTransactions(model);
    } else if (channel && project == false && service == false) {
      let model;
      if (status == false) {
        model = {
          query:"GET_TRANSACTIONS",
          data: {
            PAGE:this.page - 1,
            SIZE:this.perPage,
            TO: endDate,
            FROM: startDate,
            CHANNEL_CODE: channel
          }
        };
      } else {
        model = {
          query:"GET_TRANSACTIONS",
          data: {
            PAGE:this.page - 1,
            SIZE:this.perPage,
            TO: endDate,
            FROM: startDate,
            CHANNEL_CODE: channel,
            TRANSACTION_STATUS:"01"
          }
        };
      }
      this.postDBTransactions(model);
    } else if (service && channel == false && project == false) {
      let model;
      if (status == false) {
        model = {
          query:"GET_TRANSACTIONS",
          data: {
            PAGE:this.page - 1,
            SIZE:this.perPage,
            TO: endDate,
            FROM: startDate,
            SERVICE_ID: service
          }
        };
      } else {
        model = {
          query:"GET_TRANSACTIONS",
          data: {
            PAGE:this.page - 1,
            SIZE:this.perPage,
            TO: endDate,
            FROM: startDate,
            SERVICE_ID: service
          },
            TRANSACTION_STATUS:"01"
        };
      }
      this.postDBTransactions(model);
    } else {
      let model;
      if (status == false) {
        model = {
          query:"GET_TRANSACTIONS",
          data: {
            PAGE:this.page - 1,
            SIZE:this.perPage,
            TO: endDate,
            FROM: startDate
          }
        };
      } else {
        model = {
          query:"GET_TRANSACTIONS",
          data: {
            PAGE:this.page - 1,
            SIZE:this.perPage,
            TO: endDate,
            FROM: startDate,
            TRANSACTION_STATUS:"01"
          }
        };
      }
      this.postDBTransactions(model);
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.perPage = pageSize;
    this.loadTrans();
  }

   //selects columns to export to xlsx
   selectedColumns(event): void {
    this.indicatedColumns = event;
    this.mandatoryColumns = event;
    let exportEntries = [];
    this.transactions.map(item => {
      let container = {};
      this.indicatedColumns.map(it => {
        container[it] = item[it];
        exportEntries.push(container);
      })
    });
    this.dataToExport = exportEntries;
  }

  //exports transactions in xlsx
  exportXLSX(dataArray, title): void {
    this._exportationService.exportDataXlsx(dataArray, title);
    this.loadTrans();
  }

  //navigates to single transaction view
  viewTransaction(element): void {
    this.router.navigate(['/transactions/view-transaction/', element.ID]); 
  }
}
