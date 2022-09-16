import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DataExportationService } from 'src/app/shared/data-exportation.service';
import { HttpService } from 'src/app/shared/http.service';
import { ColumnItem } from 'src/app/shared/models/column/column-item';

@Component({
  selector: 'app-seller-rfq',
  templateUrl: './seller-rfq.component.html',
  styleUrls: ['./seller-rfq.component.scss']
})
export class SellerRfqComponent implements OnInit {

  ColumnItem: ColumnItem;
  columnsToJSON: any = {};
  dataToExport: any;
  rolesColumns: string[];
  rolesRows: any[];

  editData: boolean;
  endDate: string;
  exportTitle: string;
  listOfColumns = ['id', 'title', 'category', 'ref', 'suppliers', 'startDate', 'endDate'];
  

  loading: boolean = false;
  page: number = 1;
  pageSize: number = 10;
  paginationSize: number;
  startDate: string;
  total: number;

  workflowColumns: string[];
  workflowRows: any[];
  data: any[] = [];
  applied: any[] = [];
  notApplied: any[]

  constructor(
    private router: Router,
    private _dataExportationService: DataExportationService,
    private _httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.getSellerRFIs()
  }

  getSellerRFIs() {
    this._httpService.getP(`api/v1/rfi/seller/get-rfis-by-category/?page=${this.page-1}&size=${this.pageSize}`).subscribe((res:any) => {
      if (res["status"] === 200) {
        this.loading = false
        this.applied = res['data']['content']
        this.notApplied = res['data']['content']
      }
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.pageSize = pageSize;
    //this.getWorkflows();
  }  

  toAddRFI() {
    this.router.navigate(['tendering/RFI/add-rfi'])
  }

  viewRfi(data) {
    this.router.navigate(['/tendering/RFI/'+data.id], {queryParams: {data: JSON.stringify(data)}})
  }

  toApplication() {
    this.router.navigate(['/tendering-seller/apply-RFI'])
  }

  exportXLSX(): void {
    let rolesToExport = [];
    this.data.map(role => {
      let container = {};
      this.listOfColumns.map(col => {
        container[col] = role[this.columnsToJSON[col]];
        rolesToExport.push(container);
      })
    });
    let entries = this.getUniqueListBy(rolesToExport, "ID");
    this.dataToExport = entries;
    this._dataExportationService.exportDataXlsx(this.dataToExport, "RFI-list");
  }

  private getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  /**exports roles to pdf */
  exportPDF(): void {
    this.exportTitle = "RFI.pdf";
    this.rolesColumns = this.listOfColumns;
    this.rolesRows = this.data.map(item => {
      let container = [];
      this.listOfColumns.map(col => {
        container.push(item[this.columnsToJSON[col]]);
      })
      return container;
    });
    this._dataExportationService.exportToPdf(this.rolesColumns, this.rolesRows, this.exportTitle);
  }
}
