import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {

  gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  loading: boolean ;

  products: any[];

  constructor(
    private _httpService: HttpService,
    private toaster: ToastrService,
    private router: Router,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  toAddForm() {
    alert("Cdc")
    this.router.navigate(['/products/add-product'])
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

  transform (element: any){
    console.log(element)
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + element);
  }

  toEditProduct() {
    this.router.navigate(['/products/add-product'])
  }

}
