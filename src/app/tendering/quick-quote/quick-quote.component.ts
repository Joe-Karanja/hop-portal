import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/http.service';
import { SupplierProductsComponent } from '../supplier-products/supplier-products.component';
import { SupplierProfileComponent } from '../supplier-profile/supplier-profile.component';

@Component({
  selector: 'app-quick-quote',
  templateUrl: './quick-quote.component.html',
  styleUrls: ['./quick-quote.component.scss']
})
export class QuickQuoteComponent implements OnInit {

  current = 0;
  index :number;

  loading: boolean ;
  categories: any[];
  subCats: any[];
  skills= [];
  total: number;
  pageSize: number = 1;
  page: number = 0;
  data: any[] = [
    {
      "id": 1,
      "name": "Office Chairs",
      "location": "Kiambu, Kikuyu",
    }, {
      "id": 2,
      "name": "Office Desks",
    }
  ];
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
  quoteItem: any[] = [
    {
      "id": 1,
      "name": "Office Chairs",
      "quantity": 3,
      "budget": 1200,
    }, 
  ];

  constructor(
    private _httpService: HttpService,
    private toaster: ToastrService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.index = 1
  }
  
  addProducts() {
    const dialogRef = this.dialog.open(SupplierProductsComponent, {data: {template: 'data', view: true}, height: 'auto', width: 'auto', disableClose: false});
    dialogRef.afterClosed().subscribe(() => {
      this.index = 2;
    })
  }

  viewSupplier(data: any): void {
    const dialogRef = this.dialog.open(SupplierProfileComponent, {data: {template: data, view: true}, height: 'auto', width: 'auto', disableClose: false});
    dialogRef.afterClosed().subscribe(() => {
      this.index = 2;
    })
  }

  removeItem(index: any) {
    // this.quoteItems.splice(index, 1)
    this.quoteItems = this.quoteItem
  }

  //updates request params
  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.pageSize = pageSize;
    // this.loadBusinesses();
  }

}
