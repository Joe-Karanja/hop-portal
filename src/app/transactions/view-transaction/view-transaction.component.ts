import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpService } from '../../shared/http.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss']
})
export class ViewTransactionComponent implements OnInit {

  loading: boolean = false;
  page: number = 1;
  perPage: number = 10;
  transaction: any;

  constructor(
    private _httpService: HttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getTransaction();
  }

  //retrieves single transaction
  getTransaction(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    let model = {
      query:"GET_TRANSACTIONS",
      data:{
        PAGE:this.page - 1,
        SIZE:this.perPage,
        ID: id
      }
    };
    this._httpService.postDb(model).subscribe(res => {
      if(res['status'] === 200) {
        this.loading = false;
        res['data'].map(item => {
          this.transaction = item;
        })
      }
    })
  }
}
