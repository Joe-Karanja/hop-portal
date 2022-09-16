import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quote-approval',
  templateUrl: './quote-approval.component.html',
  styleUrls: ['./quote-approval.component.scss']
})
export class QuoteApprovalComponent implements OnInit {
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

  constructor(
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.toastr.success("Quote Accepted", "Success!");
  }
  

}
