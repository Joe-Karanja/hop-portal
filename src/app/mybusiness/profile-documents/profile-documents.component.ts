import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-profile-documents',
  templateUrl: './profile-documents.component.html',
  styleUrls: ['./profile-documents.component.scss']
})
export class ProfileDocumentsComponent implements OnInit {

  @Input() idBusiness = '' 
  @Output() open = new EventEmitter<string>();
  loading: boolean = false;

  certOfIncorp: string;

  //directors
  directorsCerts: any;
  directorsForm!: FormGroup;
  idName: string = "Upload ID";
  kraName: string = "Upload KRA Certificate";
  total: number;
  page: number = 1;
  perPage: number = 10;
  isVisible: boolean;
  
  constructor(
    private _httpService: HttpService, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
      this.getCertificateOfIncorporation();
      this.initForm();
      this.getDirectorsDocs();
  }
  initForm() {
    this.directorsForm = this.fb.group({
      kraPin: [null, [Validators.required]],
      idDocuments: [null, [Validators.required]],
      businessId: [this.idBusiness, [Validators.required]]
    })
  }

  getKycTemplate() {
    //this.loading = true
    // this._httpService.getBT("api/v1/business/get-kyc-template")
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'http://10.20.2.159:8093/api/v1/business/get-kyc-template');
    link.setAttribute('download', `hop kyc template`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  getCertificateOfIncorporation() {
    this.loading = true
    this._httpService.getBT(`api/vi/business-documents/get-business-incorporation-document/${this.idBusiness}`)
      .pipe(first())
      .subscribe((res:any) => {
        if (res["status"] == 200) {
          this.certOfIncorp =  res["data"]
          // console.log(res)
        }
        this.loading = false
      })
  }

  getDirectorsDocs() {
    this.loading = true
    this._httpService.getBT(`api/vi/business-documents/get-business-directors-documents/${this.idBusiness}`)
      .pipe(first())
      .subscribe((res:any) => {
        if (res["status"] == 200) {
          this.directorsCerts =  res["data"]
          // console.log(res)
        }
        this.loading = false
      })
  }

  openModal(docBase64:any) {
    this.open.emit(docBase64)
  }

  handleCert(event: any) {
    let model = {
      businessId : parseInt(this.idBusiness),
      document: event.target?.files[0]
    }
    console.log(model)
    this._httpService.postBTForm('api/vi/business-documents/add-incorporation', model)
    .pipe(first())
    .subscribe((res:any) =>{
      if(res["status"] == 200) {
        // console.log(res)
        this.toastr.success(res['message'], "Success")
      } 
      // this.btnLoading = false;
    })

  }

  addDirectorDocs() {
    let model = {
      businessId : parseInt(this.idBusiness),
    }
    this._httpService.postBTCerts('api/vi/business-documents/add-business-directors-document', this.directorsForm.value)
    .pipe(first())
    .subscribe((res:any) =>{
      if(res["status"] == 200) {
        // console.log(res)
        this.toastr.success(res['message'], "Success")
        this.getDirectorsDocs()
      } 
      this.isVisible = false;
    })
  }

  handleID(event: any) {
    this.directorsForm.patchValue({
      idDocuments: event.target?.files[0]
    })
    this.directorsForm.get('idDocuments')?.updateValueAndValidity()
    this.idName = event.target.files[0].name + ", "+ (event.target.files[0].size/1000).toFixed(3) + "KBs" 
  }

  handleKra(event: any) {
    this.directorsForm.patchValue({
      kraPin: event.target?.files[0]
    })
    this.directorsForm.get('kraPin')?.updateValueAndValidity()
    this.kraName = event.target.files[0].name + ", "+ (event.target.files[0].size/1000).toFixed(3) + "KBs" 
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.perPage = pageSize;
    // this.getBusinessUsers();
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = true;
  }

}
