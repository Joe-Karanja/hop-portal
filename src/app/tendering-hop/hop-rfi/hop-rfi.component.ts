import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/http.service';
import { ColumnItem } from 'src/app/shared/models/column/column-item';

@Component({
  selector: 'app-hop-rfi',
  templateUrl: './hop-rfi.component.html',
  styleUrls: ['./hop-rfi.component.scss']
})
export class HopRfiComponent implements OnInit {
  ColumnItem: ColumnItem;
  columnsToJSON: any = {};
  editData: boolean;
  endDate: string;
  exportTitle: string;
  listOfColumns = ['ID', 'Workflow Name', 'Status', 'Created On', 'Description', 'Role Id'];
  

  loading: boolean;
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
  searchVisible:boolean ;
  listOfDisplayData = [...this.data];


  //Modal
  isVisible: boolean;
  listOfSelection = [];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly any[] = [];
  listOfData: readonly any[] = [
    {
      "id": 1,
      "name": "Miles Industries",
      "location": "Kiambu, Kikuyu",
      "category": "Government",
      "subCategory": "FinTech",
      "contact": '+2547 05289 881'
    }, {
      "id": 2,
      "name": "Daugherty and Sons",
      "location": "Nairobi, CBD",
      "category": "Government",
      "subCategory": "Mining",
      "contact": '+2547 05289 881'
    }
  ];
  setOfCheckedId = new Set<number>();
  current = 0;
  index :number;
  btnLoading: boolean;

  //Respond Modal
  respondModal: boolean;

  constructor(
    private router: Router,
    private _httpService: HttpService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAdminRFIs()
  }

  getAdminRFIs() {
    this.loading = true
    this._httpService.getP(`api/v1/rfi/admin/get-rfis?page=${this.page-1}&size=${this.pageSize}`).subscribe((res:any) => {
      if (res["status"] === 200) {
        this.loading = false
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

  search(): void {
    if (this.searchValue !== null)
    {
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

  //generate rfq modal
  triggerModal() {
    this.index = 1
    this.isVisible = true;
  }

  handleCancel() {
    this.current = 0
    this.isVisible = false
  }

  handleOk() {
    //this.isVisible = false
    if (this.current == 0) {
      this.current += 1;
      this.changeContent();
    } else {
      this.btnLoading = true;
      setTimeout(() => {
        this.toaster.success("RFI generated", "success");
        this.current = 0
        this.isVisible = false
        this.btnLoading = false
      }, 2000)
    }
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 1;
        break;
      }
      case 1: {
        this.index = 2;
        break;
      }
      default: {
        this.index = 1;
      }
    }
  }

  //respond modal

  triggerRespondModal() {
    this.index = 1
    this.respondModal = true
  }

  respondWithSuppliers() {
    this.btnLoading = true
    setTimeout(() => {
      this.toaster.success("Response Sent", "success");
      this.btnLoading = false
      this.respondModal = false
    }, 2000)
  }

  handleRespondCancel() {
    setTimeout(() => {
      this.respondModal = false
    }, 1000)
    
  }

}
