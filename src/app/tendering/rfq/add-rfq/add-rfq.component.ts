import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/http.service';
import { SupplierProductsComponent } from '../../supplier-products/supplier-products.component';
import { SupplierProfileComponent } from '../../supplier-profile/supplier-profile.component';

@Component({
  selector: 'app-add-rfq',
  templateUrl: './add-rfq.component.html',
  styleUrls: ['./add-rfq.component.scss']
})
export class AddRfqComponent implements OnInit {

  current = 0;
  index :number;

  loading: boolean ;
  validateForm!: FormGroup;
  
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

  // first form 
  categories: any[];
  subCats: any[];
  types: any[];
  page: number = 0;
  size: number = 10;
  instructions:any[] = [];
  goals: any[] = [];

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    if (this.index == 1) {
      let model = {
        title: this.validateForm.controls['title'].value,
        category: this.validateForm.controls['category'].value,
        subCategory: this.validateForm.controls['subCategory'].value,
        rfqType: this.validateForm.controls['rfqType'].value,
        instructions: [this.validateForm.controls['instructions'].value],
        goals: [this.validateForm.controls['goals'].value],
        businessEmail: JSON.parse(localStorage.getItem("currentUser")).email
      }

      console.log(JSON.stringify(model))
      this._httpService.postP("api/v1/rfq/create-rfq", JSON.stringify(model)).subscribe(res => {
        if (res['status'] == 200) {
          this.toaster.success(res["messsage"], "Success!")
          this.current += 1;
          this.changeContent();
        }
      })
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
  constructor(
    private fb: FormBuilder,
    private _httpService: HttpService,
    private toaster: ToastrService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getTypes()
    this.getSubCategories();
    this.initForm()
    this.index = 1
    
  }

  getCategories() {
    this._httpService.getUnAuth(`api/v1/business/get-business-types?page=${this.page}&size=${this.size}`).subscribe(res => {
      if (res['status'] === 200) {
        console.log(res)
        this.categories = res["data"]["content"]
      }
    })
  }
  getSubCategories() {
    this._httpService.getUnAuth(`api/v1/business/get-business-subcategories?page=${this.page}&size=${this.size}`).subscribe(res => {
      if (res['status'] === 200) {
        console.log(res)
        this.subCats = res["data"]["content"]
        this.loading = false;
      }
    })
  }

  getTypes() {
    this._httpService.getP(`api/v1/rfq/get-all-rfq-types`).subscribe(res => {
      if (res['status'] === 200) {
        console.log(res)
        this.types = res["data"]
        this.loading = false;
      }
    })
  }

  initForm() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      category: [null, [Validators.required]],
      subCategory: [null, [Validators.required]],
      rfqType: [null, [Validators.required]],
      instructions: [null, [Validators.required]],
      goals: [null, [Validators.required]],
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
      this.index = 2;
    })
  }

  removeItem(index: any) {
    // this.quoteItems.splice(index, 1)
    this.quoteItems = this.quoteItem
  }
}
