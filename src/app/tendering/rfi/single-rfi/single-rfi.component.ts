import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ColumnItem } from 'src/app/shared/models/column/column-item';

@Component({
  selector: 'app-single-rfi',
  templateUrl: './single-rfi.component.html',
  styleUrls: ['./single-rfi.component.scss']
})
export class SingleRfiComponent implements OnInit {
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

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router
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

}
