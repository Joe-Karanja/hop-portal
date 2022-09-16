import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpService } from '../../../shared/http.service';

@Component({
  selector: 'app-single-school-pay',
  templateUrl: './single-school-pay.component.html',
  styleUrls: ['./single-school-pay.component.scss']
})
export class SingleSchoolPayComponent implements OnInit {

  loading: boolean = false;
  page: number = 1;
  perPage: number = 10;
  startDate: string;
  endDate: string;
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
      query: "GET_SCHOOL_PAY_TRANSACTIONS",
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
