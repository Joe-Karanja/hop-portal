import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpService } from 'src/app/shared/http.service';
import { ColumnItem } from 'src/app/shared/models/column/column-item';

@Component({
  selector: 'app-hop-rfp',
  templateUrl: './hop-rfp.component.html',
  styleUrls: ['./hop-rfp.component.scss']
})
export class HopRfpComponent implements OnInit {

  ColumnItem: ColumnItem;
  columnsToJSON: any = {};
  editData: boolean;
  endDate: string;
  exportTitle: string;
  listOfColumns = ['ID', 'Workflow Name', 'Status', 'Created On', 'Description', 'Role Id'];
  

  loading: boolean = false;
  page: number = 1;
  pageSize: number = 10;
  paginationSize: number;
  startDate: string;
  total: number;

  workflowColumns: string[];
  workflowRows: any[];
  data: any[] = []
  ;

  //search
  searchValue: string;
  visible = false;
  listOfDisplayData = [...this.data];



  constructor(
    private router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.getAdminRFIs()
  }

  getAdminRFIs() {
    this._httpService.getP(`api/v1/rfi/admin/get-rfis?page=${this.page-1}&size=${this.pageSize}`).subscribe((res:any) => {
      if (res["status"] === 200) {
        this.loading = false
        this.data = res['data']['content']
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

  search(): void {
    if (this.searchValue !== null){
        this.listOfDisplayData = this.data.filter((item: any) => item.title.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
        || item.ref.indexOf(this.searchValue) !== -1);
      if (this.listOfDisplayData.length > 0)  {
        this.data = this.listOfDisplayData
      }
    } else if (this.searchValue == null) {
      this.ngOnInit()
    }
  }

  reset(): void {
    this.searchValue = '';
    //this.loadBusinesses();
    this.visible = false
  }
}
