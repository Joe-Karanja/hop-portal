import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpService } from 'src/app/shared/http.service';
import { ColumnItem } from 'src/app/shared/models/column/column-item';

@Component({
  selector: 'app-hop-rfq',
  templateUrl: './hop-rfq.component.html',
  styleUrls: ['./hop-rfq.component.scss']
})
export class HopRfqComponent implements OnInit {

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
  data: any[] = [
    {
      "id": 1,
      "rfiCode": "HOPRFQ0232",
      "title": "Office Chairs",
      "quantity": 32,
      "name": "OOKA Consulting",
      "location": "Kiambu, Kikuyu",
      "category": "Govenment",
      "subCategory": "Mining",
      "createdOn": '12/2/2022',
      "dueDate": '2/3/2022',
    }, {
      "id": 2,
      "rfiCode": "HOPRFQ0242",
      "title": "Office Desks",
      "quantity": 24,
      "name": "Miles Industries",
      "location": "Nakuru, KA",
      "category": "IT",
      "subCategory": "FinTech",
      "createdOn": '2/2/2022',
      "dueDate": '3/3/2022',
    }
  ];

  singleData: any[] = [
    {
      "id": 1,
      "rfiCode": "HOPRFQ0232",
      "title": "Office Chairs",
      "quantity": 32,
      "name": "OOKA Consulting",
      "location": "Kiambu, Kikuyu",
      "category": "Govenment",
      "subCategory": "Mining",
      "createdOn": '12/2/2022',
      "dueDate": '2/3/2022',
    }, 
  ];

  suppliers: any[] = [{
      "id": 1,
      "name": "OOKA ",
      "title": "Office Chairs",
      "category": "Office",
      "subCategory": "Chairs",
      "amount": 2000
    }, {
      "id": 1,
      "name": "KWTA ",
      "title": "Executive Office Chairs",
      "category": "Office",
      "subCategory": "Chairs",
      "amount": 3200
    }];

  //search
  searchValue: string;
  visible = false;
  listOfDisplayData = [...this.data];

  //modal
  respondModal: boolean;
  addSupplierModal: boolean;
  searchProductValue: string;
  setOfCheckedId = new Set<number>();
  supplierAdded: boolean;

  constructor(
    private router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit(): void {
    //this.getAdminRFIs()
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

  //respond Modal
  triggerModal() {
    this.respondModal = true
  }

  handleRespondCancel(){
    this.respondModal = false
  }

  respondWithSuppliers() {
    this.respondModal = false
  }

  // add supplier modal
  triggerSupplierModal(name: any) {
    this.searchProductValue = name;
    this.addSupplierModal = true
  }

  handleSupplieCancel(){
    this.addSupplierModal = false
  }

  handleSupplierOk() {
    this.addSupplierModal = false
    this.supplierAdded = true
  }
  searchProducts() {

  }
}
