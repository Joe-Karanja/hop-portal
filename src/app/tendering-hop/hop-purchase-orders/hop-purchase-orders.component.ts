import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';
import { ColumnItem } from 'src/app/shared/models/column/column-item';
import { QuoteApprovalComponent } from 'src/app/tendering/rfq/quote-approval/quote-approval.component';

@Component({
  selector: 'app-hop-purchase-orders',
  templateUrl: './hop-purchase-orders.component.html',
  styleUrls: ['./hop-purchase-orders.component.scss']
})
export class HopPurchaseOrdersComponent implements OnInit {

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
  workflows: any[];
  data: any[] = [
    {
      "id": 1,
      "code": "HOPPOFIWC1MEW",
      "name": "Office Chairs",
      "category": "Fintech",
      "subCategory": "Procurement",
      "status": "processing",
      "date": "3/21/2022",
    }
  ];
  sets: any[] = [{
    "id": 1,
    "name": "Grant, Bartoletti and Kling",
    "location": "74172 Eagan Road",
    "createdOn": "11/11/2021",
    "delivery": "3/21/2021",
    "amount": 37234
  }, {
    "id": 2,
    "name": "Daugherty and Sons",
    "location": "20 Mariners Cove Center",
    "createdOn": "4/11/2021",
    "delivery": "10/20/2021",
    "amount": 81714
  }, {
    "id": 3,
    "name": "Rutherford, Schroeder and Kovacek",
    "location": "440 Clyde Gallagher Plaza",
    "createdOn": "1/28/2022",
    "delivery": "6/21/2021",
    "amount": 44123
  }, {
    "id": 4,
    "name": "Satterfield, Toy and Johnson",
    "location": "84 Westend Junction",
    "createdOn": "5/5/2021",
    "delivery": "7/2/2021",
    "amount": 72303
  }]

  quoteItems: any[] = [
    {
      "id": 1,
      "name": "Office Chairs",
      "quantity": 3,
      "budget": 1200,
    }, {
      "id": 2,
      "name": "Office Desks",
      "quantity": 5,
      "budget": 3000,
    }
  ];

  expand = true

  //modal 
  isVisible: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      (params:any) => {
        console.log(JSON.parse(params.data))
        this.data = JSON.parse(params.data)
      }
    );

  }

  toSupplierProfile() {
    this.router.navigate(['/tendering/supplier-profile/1'])
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.pageSize = pageSize;
    //this.getWorkflows();
  } 

  approve() {
    const dialogRef = this.dialog.open(QuoteApprovalComponent, {data: {template: 'data', view: true}, height: 'auto', width: '500px', disableClose: false});
    dialogRef.afterClosed().subscribe(() => {

    })
  }

  showModal() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  updateStatus() {
    this.toastr.success("status updated", "Success!");
    this.data[0].status = "dispatched"
    this.isVisible = false;
  }


}
