import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any;
  gridStyle = {
    width: '24%',
    textAlign: 'center',
  };

  constructor(
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    console.log(this.product)
  }

  transform (element: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + element);
  }
}
