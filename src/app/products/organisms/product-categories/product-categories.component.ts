import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {

  @Input() name: string;

  loading: boolean;
  products: any;

  constructor(
    private _httpService: HttpService,
    private toaster: ToastrService,
    private router: Router,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    //alert(this.name)
    this.getProducts();
  }

  getProducts() {
    this.loading = true
    const model = {
      page:0,
      size:10,
      email:"anonymoususer" 
    }
    this._httpService.getProducts("api/v1/product/get-products-by-seller", model).subscribe((res:any) => {
      if (res["status"] === 200) {
        this.loading = false
        this.products = res['data']['content']
      }
      this.loading = false
    })
  }

}
