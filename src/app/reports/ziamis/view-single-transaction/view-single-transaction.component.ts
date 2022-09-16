import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { HttpService } from "../../../shared/http.service";

@Component({
  selector: 'app-view-single-transaction',
  templateUrl: './view-single-transaction.component.html',
  styleUrls: ['./view-single-transaction.component.scss']
})
export class ViewSingleTransactionComponent implements OnInit {

  endDate: string;
  page: number = 1;
  perPage: number = 10;
  startDate: string;
  transaction: any;

  constructor(
    private _httpService: HttpService,
    private route: ActivatedRoute
  ) { 
    let today = new Date;
    this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-13).toISOString().slice(0,10);
    this.endDate = new Date().toISOString().slice(0,10);
  }

  ngOnInit(): void {
    this.getTransaction();
  }

  //retrieves transaction details
  getTransaction(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    let model = {
      query: "GET_ZIAMIS_TRANSACTIONS",
      data: {
        PAGE: this.page - 1,
        SIZE:  this.perPage,
        ID: id
      }
    };
    this._httpService.postDb(model).subscribe(res => {
      if (res['status'] === 200) {
        res['data'].map(trans => {
         this.transaction = trans;
        });
      }
    })
  }

}
