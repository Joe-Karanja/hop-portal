import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/http.service';
import { SupplierProductsComponent } from '../../supplier-products/supplier-products.component';
import { SupplierProfileComponent } from '../../supplier-profile/supplier-profile.component';


@Component({
  selector: 'app-add-rfp',
  templateUrl: './add-rfp.component.html',
  styleUrls: ['./add-rfp.component.scss']
})
export class AddRfpComponent implements OnInit {

  current = 0;
  index :number;

  loading: boolean ;
  validateForm!: FormGroup;
  categories: any[];
  subCats: any[];
  skills= [];
  suppliers: readonly any[] = [
    {
      "id": 1,
      "name": "Miles Industries",
      "location": "Kiambu, Kikuyu",
      "category": "Government",
      "subCategory": "Stationery",
      "contact": '+2547 05289 881'
    }, {
      "id": 2,
      "name": "Daugherty and Sons",
      "location": "Nairobi, CBD",
      "category": "Government",
      "subCategory": "Stationery",
      "contact": '+2547 05289 881'
    }
  ];
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

  //search
  searchVisible = false;
  searchValue = '';


  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
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
      case 2: {
        this.index = 3;
        break;
      }
      default: {
        this.index = 1;
      }
    }
  }
  constructor(
    private fb: FormBuilder,
    private _httpService: HttpService,
    private toaster: ToastrService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.index = 1
  }

  initForm() {
    this.validateForm = this.fb.group({
      rfqTitle: [null, [Validators.required]],
      category: [null, [Validators.required]],
      subCategory: [null, [Validators.required]],
    });
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
      //
    })
  }

  removeItem(index: any) {
    // this.quoteItems.splice(index, 1)
    this.quoteItems = this.quoteItem
  }

  reset(): void {
    this.searchValue = '';
    this.searchVisible = false
  }

  search(): void {
    this.suppliers = this.data.filter((item: any) => item.businessName.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
    if (this.suppliers.length > 0) {
      this.suppliers = this.suppliers
    } else if(this.searchValue === ''){
      //this.loadBusinesses()
    }
  }

}
