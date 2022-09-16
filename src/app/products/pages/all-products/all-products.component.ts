import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  validateForm!: FormGroup;
  loading: boolean = false;
  tagValue = ['a10', 'c12', 'tag'];
  cats: any[];
  subCats: any[];
  products: any;
  date:any;

  constructor(
    private fb: FormBuilder,
    private _httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.loadTypes();
    this.loadSubTypes();
    this.getProducts();
  }

  loadTypes() {
    this.loading = true;
    this._httpService.getP("api/v1/product/get-product-categories?page=0&size=10")
      .pipe(first())
      .subscribe((res:any) =>{
        if(res["status"] === 200) {
          this.cats = res["data"]["content"]
          if (this.cats.length > 0) {
            this.loading = false
          }
        }
    })
  }

  loadSubTypes() {
    this.loading = true;
    this._httpService.getP("api/v1/product/get-sub-product-categories/1?page=0&size=10")
      .pipe(first())
      .subscribe((res:any) =>{
        if(res["status"] === 200) {
          this.subCats = res["data"]["content"]
        }
    })
  }

  getProducts() {
    this.loading = true
    const model = {
      page:0,
      size:10,
      email:"anonymoususer" 
    }
    this._httpService.getProducts("api/v1/product/get-products-by-seller", model).pipe(first()).subscribe((res:any) => {
      if (res["status"] === 200) {
        this.loading = false
        console.log(res)
        this.products = res['data']['content']
      }
      this.loading = false
    })
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  onChange(event: any) {

  } 

}
