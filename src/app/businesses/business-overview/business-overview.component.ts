import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/http.service';

interface BusinessItem {
  businessName: string;
  location: string;
  type: string;
  subType: string;
  users: number;
  

}

@Component({
  selector: 'app-business-overview',
  templateUrl: './business-overview.component.html',
  styleUrls: ['./business-overview.component.scss']
})
export class BusinessOverviewComponent implements OnInit {

  data: BusinessItem[] = [];
  loading: Boolean;
  questions: any[];
  page: number = 1;
  perPage: number = 10;
  total: number;

  //search
  searchValue = '';
  visible = false;
  listOfDisplayData = [...this.data];
  dateForm: FormGroup;
  date: any;

  constructor(
    private _httpService: HttpService,
    private toaster: ToastrService,
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadBusinesses()
  }

  reset(): void {
    this.searchValue = '';
    this.loadBusinesses();
    this.visible = false
  }

  loadBusinesses() {
    this.searchValue = ''
    this.loading = true;
    this._httpService.getBT(`api/v1/business/get-all?page=${this.page-1}&size=${this.perPage}`)
      .pipe(first())
      .subscribe((res:any) =>{
        if(res["status"] === 200) {
          this.data = res["data"]["content"]
          if (this.data.length > 0) {
            this.loading = false
            this.total = res['data']['totalElements'];
          } else {
            
          }
          console.log(this.data)
      }
    })
  }
  view(element: any) {
    this.router.navigate(['/companies/profile', element.id, {profile: element.businessName}]);
  }

  search(): void {
    this.listOfDisplayData = this.data.filter((item: any) => item.businessName.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
    if (this.listOfDisplayData.length > 0) {
      this.data = this.listOfDisplayData
    } else if(this.searchValue === ''){
      this.loadBusinesses()
    }
  }
  
   //updates request params
   onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.perPage = pageSize;
    this.loadBusinesses();
  }
  onChange(event:any) {
    
  }
}
