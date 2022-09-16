import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ColumnItem } from 'src/app/shared/models/column/column-item';
import { QuoteApprovalComponent } from '../quote-approval/quote-approval.component';

@Component({
  selector: 'app-single-rfq',
  templateUrl: './single-rfq.component.html',
  styleUrls: ['./single-rfq.component.scss']
})
export class SingleRfqComponent implements OnInit {

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
  data: any;
  sets: any[] = [{
    "id": 1,
    "name": "Offer A",
    "location": "74172 Eagan Road",
    "createdOn": "11/11/2021",
    "delivery": "3/21/2021",
    "payment": "Payment On Deleivery",
    "amount": "37,000"
  }, {
    "id": 2,
    "name": "Offer B",
    "location": "20 Mariners Cove Center",
    "createdOn": "4/11/2021",
    "delivery": "10/20/2021",
    "payment": "Payment On Order",
    "amount": "41,700"
  }, {
    "id": 3,
    "name": "Offer C",
    "location": "440 Clyde Gallagher Plaza",
    "createdOn": "1/28/2022",
    "delivery": "6/21/2021",
    "payment": "Payment On Deleivery",
    "amount": "44,300"
  }, {
    "id": 4,
    "name": "Offer D",
    "location": "84 Westend Junction",
    "createdOn": "5/5/2021",
    "delivery": "7/2/2021",
    "payment": "Payment On Deleivery or Payment On Order",
    "amount": "52,300"
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

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
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

}
