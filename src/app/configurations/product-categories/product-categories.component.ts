import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AddCategoryComponent } from './add-category/add-category.component';
import { HttpService } from 'src/app/shared/http.service';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {

  data: any[];
  subTypes: any;
  loading: Boolean = false;

  addCatBool:Boolean;
  addSubTypeBool: Boolean = false;
  constructor(
    private _httpService: HttpService,
    private toaster: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadTypes();
    this.loadSubTypes();
  }

  loadTypes() {
    this.loading = true;
    this._httpService.getP("api/v1/product/get-product-categories?page=0&size=10")
      .pipe(first())
      .subscribe((res:any) =>{
        if(res["status"] === 200) {
          this.data = res["data"]["content"]
          if (this.data.length > 0) {
            this.loading = false
          }
          console.log(this.data)
        }
    })
  }

  loadSubTypes() {
    this.loading = true;
    this._httpService.getP("api/v1/product/get-sub-product-categories/5?page=0&size=10")
      .pipe(first())
      .subscribe((res:any) =>{
        if(res["status"] === 200) {
          this.subTypes = res["data"]["content"]
          if (this.subTypes.length > 0) {
            this.loading = false
          }
          console.log(res)
        }
    })
  }

  //triggers q modal
  triggerModal(data: any): void {
    this.addCatBool = true;
    const dialogRef = this.dialog.open(AddCategoryComponent, {data: {template: data, addCatBool: this.addCatBool}, height: '300px', width: '600px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadTypes();
    })
  }

  triggerSubModal(data: any): void {
    this.addSubTypeBool = true;
    const dialogRef = this.dialog.open(AddSubcategoryComponent, {data: {template: data, addSubTypesBool: this.addSubTypeBool}, height: '600px', width: '600px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadSubTypes();
    })
  }

}
