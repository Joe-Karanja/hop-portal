import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() name: string;

  loading: boolean;
  products: any;
  categoryName: any;

  constructor(
    private _httpService: HttpService,
    private toaster: ToastrService,
    private router: Router,
    private sanitizer:DomSanitizer,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //alert(this.name)
    this.getProducts();
    this.getCategoryName();
  }
  getCategoryName() {
    this.activeRoute.params.subscribe(
      (params:any) => {
        this.categoryName = params.name
      }
    );
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
