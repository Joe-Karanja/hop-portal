import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { th } from 'date-fns/locale';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/http.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {
  business: any;
  users: any;
  idBusiness: any;
  loading: boolean;
  columnsToDisplay: any = {};
  mandatoryColumns: string[] = ["ID", "FirstName", "LastName","Email", "Phone Number", "Status", "CreatedOn"];
  userColumns: any[];
  startDate: string;
  total: number;
  page: number = 1;
  perPage: number = 10;

  //questionnaires
  responses: any[]
  questions: any[]

  //docs
  docBase64: any
  isVisible = false;

  //approval
  btnLoading: boolean;
  viewApproval: boolean;
  approveForm: FormGroup;

  constructor(
    private _httpService: HttpService, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { 
    
  }

  ngOnInit(): void {
    this.getData();
    this.getBusinessUsers();
    this.getResponses();
    this.initForm();
  }

  initForm() {
    this.approveForm = this.fb.group({
      businessId: [this.idBusiness, Validators.required], 
      status: [null, Validators.required],
      remarks: [null, Validators.required],
    }) 
  }
  
  getData() {
    this.loading = true;
    this.idBusiness = this.route.snapshot.paramMap.get('id');
    console.log(this.idBusiness)
    this._httpService.getBT(`api/v1/business/get-business-details/${this.idBusiness}`)
    .pipe(first())
    .subscribe((res:any) =>{
      if(res["status"] === 200) {
        this.business = res["data"];
        this.loading = false;
      }
      this.loading = false;
    })
  }

  getBusinessUsers() {
    this.loading = true
    this.idBusiness = this.route.snapshot.paramMap.get('id');
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
        cols = Array.from(new Set(cols));
        cols.map(item => {
          switch(item) {
            case "id":
              this.columnsToDisplay["ID"] = "id";
              break;
            case "name":
              this.columnsToDisplay["Profile Name"] = "name";
              break;
            case "remarks":
              this.columnsToDisplay["Description"] = "remarks";
              break;
            case "isActive":
              this.columnsToDisplay["Status"] = "isActive";
              break;
            case "createdOn":
              this.columnsToDisplay["CreatedOn"] = "createdOn";
              break;
          }
        });
        this.userColumns = Object.keys(cols);
      } else {
        this.loading = false;
        this.toastr.error("Profiles cannot be retrieved", "Error");
      }
    })
  }

  getResponses() {
    this.loading = true
    this.idBusiness = this.route.snapshot.paramMap.get('id');
    this._httpService.getBT(`api/v1/questionnaire/get-business-answers/${this.idBusiness}?page=0&size=10`)
    .pipe(first())
    .subscribe((res:any) =>{
      if(res["status"] === 200) {
        this.responses = res["data"];
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
    //this.getBusinessUsers();
  }

  open(content:any, base64:any) {
    this.docBase64 = base64
    this.isVisible = true;
    
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  handleViewCancel() {
    this.viewApproval = false
  }

  approveBusiness(){
    this.btnLoading = true
    this.idBusiness = this.route.snapshot.paramMap.get('id');
    let model = this.approveForm.value
    console.log(model)
    this._httpService.postBT('api/v1/business/approve-decline-business', model)
    .pipe(first())
    .subscribe((res:any) =>{
      console.log(res)
      if(res["status"] === 200) {
        this.toastr.success(res["message"], "Success!")
        this.viewApproval = false
        this.getData();
      } else {
        this.toastr.error(res["message"]);
      }
      this.btnLoading = false;
    })
  }

  handleViewOk() {
    this.approveBusiness()
  }

}
