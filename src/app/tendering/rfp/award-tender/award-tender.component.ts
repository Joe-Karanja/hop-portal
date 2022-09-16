import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-award-tender',
  templateUrl: './award-tender.component.html',
  styleUrls: ['./award-tender.component.scss']
})
export class AwardTenderComponent implements OnInit {

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

  loading: boolean ;
  total: number;
  pageSize: number;
  page: number;

  constructor() { }

  ngOnInit(): void {
  }
  
}
