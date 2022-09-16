import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.scss']
})
export class SupplierProductsComponent implements OnInit {

  data: any[] = [
    {
      "id": 1,
      "name": "Office Chairs",
      "desc": "Long lasting and comfortable",
    }, {
      "id": 2,
      "name": "Office Desks",
      "desc": "Comfortable Office desks",
    }
  ];

  //search
  searchValue = '';
  visible = false;
  listOfDisplayData = [...this.data];

  //budget dropdown
  budget: any;
  quantity: any;
  toatal: any;  
  selectVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  reset(): void {
    this.searchValue = '';
    this.visible = false
  }

  search(): void {
    this.listOfDisplayData = this.data.filter((item: any) => item.businessName.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
    if (this.listOfDisplayData.length > 0) {
      this.data = this.listOfDisplayData
    } else if(this.searchValue === ''){
      //this.loadBusinesses()
    }
  }

  addToQuote(data: any) {
    this.selectVisible = true;
  }

}
