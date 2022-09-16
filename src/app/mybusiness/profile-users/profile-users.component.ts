import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-profile-users',
  templateUrl: './profile-users.component.html',
  styleUrls: ['./profile-users.component.scss']
})
export class ProfileUsersComponent implements OnInit {

  @Input() idBusiness = '' 
  loading: boolean = false;
  users: any;
  userColumns: any[];
  startDate: string;
  total: number;
  page: number = 1;
  perPage: number = 10;

  constructor(
    private _httpService: HttpService, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getBusinessUsers()
  }

  getBusinessUsers() {
    this.loading = true
    this._httpService.getBT(`api/v1/business/view-registered-users/${this.idBusiness}?page=0&size=10`)
    .pipe(first())
    .subscribe((res:any) =>{
      if(res["status"] === 200) {
        console.log(res)
        this.users = res["data"]["content"];
        this.loading = false;
        let cols = [];
        this.users.map(item => {
          Object.keys(item).map(ky => {
            cols.push(ky);
          })
        });
      } else {
        this.loading = false;
        this.toastr.error("Profiles cannot be retrieved", "Error");
      }
    })
  }

  //updates request params
  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.perPage = pageSize;
    this.getBusinessUsers();
  }

}
