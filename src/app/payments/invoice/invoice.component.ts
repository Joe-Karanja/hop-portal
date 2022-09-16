import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  loading: boolean = false;
  page: number = 1;
  pageSize: number = 10;
  paginationSize: number;
  startDate: string;
  total: number;

  //modal
  isVisible: boolean;
  selectedValue: any;

  workflowColumns: string[];
  workflowRows: any[];
  workflows: any[];
  data: any[] = [
    {
      "id": 1,
      "code": "HOPINV-WC1MEW",
      "payment": "On Delivery",
      "amount": "42,000",
      "status": "Settled",
      "date": "3/21/2022",
      "quoteItems" : [
        {
          "id": 1,
          "name": "Office Chairs",
          "quantity": 3,
          "budget": 1200,
        }, 
      ]
    },
    {
      "id": 2,
      "code": "HOPINV-WC1MEW",
      "payment": "On Delivery",
      "amount": "42,000",
      "status": "Settled",
      "date": "3/21/2022",
      "quoteItems" : [
        {
          "id": 2,
          "name": "Office Desks",
          "quantity": 5,
          "budget": 3000,
        }
      ]
    },

  ];


  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.pageSize = pageSize;
    //this.getWorkflows();
  } 

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

}
