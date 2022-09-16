import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpService } from 'src/app/shared/http.service';
import { ColumnItem } from 'src/app/shared/models/column/column-item';

@Component({
  selector: 'app-rfi',
  templateUrl: './rfi.component.html',
  styleUrls: ['./rfi.component.scss']
})
export class RFIComponent implements OnInit {
  ColumnItem: ColumnItem;
  columnsToJSON: any = {};
  editData: boolean;
  endDate: string;
  exportTitle: string;
  listOfColumns = ['ID', 'Workflow Name', 'Status', 'Created On', 'Description', 'Role Id'];
  

  loading: boolean ;
  page: number = 1;
  pageSize: number = 10;
  paginationSize: number;
  startDate: string;
  total: number;

  workflowColumns: string[];
  workflowRows: any[];
  data: any[] = []
  ;


  constructor(
    private router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.getBuyerRFIs()
  }

  getBuyerRFIs() {
    this.loading = true
    this._httpService.getP(`api/v1/rfi/get-my-business-rfis?page=${this.page-1}&size=${this.pageSize}`).subscribe((res:any) => {
      if (res["status"] === 200) {
        this.data = res['data']['content']
      }
      this.loading = false
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

}
