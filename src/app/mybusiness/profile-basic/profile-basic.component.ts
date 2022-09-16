import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-profile-basic',
  templateUrl: './profile-basic.component.html',
  styleUrls: ['./profile-basic.component.scss']
})
export class ProfileBasicComponent implements OnInit {

  @Input() idBusiness = '' 
  @Output() open = new EventEmitter<string>();
  loading: boolean = false;
  btnLoading: boolean ;
  business: any;

  //forms
  websiteForm!: FormGroup;
  aboutForm!: FormGroup;

  constructor(
    private _httpService: HttpService, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    if (this.idBusiness !== null) {
      this.getData();
    } 
  }
  initForms() {
    this.websiteForm = this.fb.group({
      website: [this.business == '' ? '' : this.business.websiteUrl , [Validators.required]],
      twitter: [this.business == null ? '' : this.business.twitterProfile , [Validators.required]],
      facebook: [this.business == null ? '' : this.business.facebookProfile , [Validators.required]],
    });

    this.aboutForm = this.fb.group({
      about: [this.business == null ? '' : this.business.about , [Validators.required]],
      mission: [this.business == null ? '' : this.business.mission , [Validators.required]],
      vision: [this.business == null ? '' : this.business.vision , [Validators.required]]
    })
  }

  getData() {
    this.loading = true;
    this._httpService.getBT(`api/v1/business/get-business-details/${this.idBusiness}`)
    .pipe(first())
    .subscribe((res:any) =>{
      if(res["status"] == 200) {
        console.log(res)
        this.business = res["data"];
        this.initForms();
      } 
      this.loading = false;
    })
  }

  openModal(content: any, docBase64:any) {
    this.open.emit(docBase64)
  }

  updateSite(event: any) {
    this.btnLoading = true;
    let model = {
      businessId: this.idBusiness, 
      websiteUrl: this.websiteForm.controls['website'].value,
      twitterProfile: this.websiteForm.controls['twitter'].value,
      facebookProfile: this.websiteForm.controls['facebook'].value,
      vision: this.aboutForm.controls['vision'].value,
      mission: this.aboutForm.controls['mission'].value,
      about: this.aboutForm.controls['about'].value
    }
    this._httpService.postBT('api/v1/business/add-more-details', model)
    .pipe(first())
    .subscribe((res:any) =>{
      if(res["status"] == 200) {
        console.log(res)
        this.toastr.success(res['message'], "Success")
      } 
      this.btnLoading = false;
    })

  }

  updateAbout(event: any) {
    this.btnLoading = true;
    let model = {
      businessId: this.idBusiness, 
      websiteUrl: this.websiteForm.controls['website'].value,
      twitterProfile: this.websiteForm.controls['twitter'].value,
      facebookProfile: this.websiteForm.controls['facebook'].value,
      vision: this.aboutForm.controls['vision'].value,
      mission: this.aboutForm.controls['mission'].value,
      about: this.aboutForm.controls['about'].value
    }
    this._httpService.postBT('api/v1/business/add-more-details', model)
    .pipe(first())
    .subscribe((res:any) =>{
      if(res["status"] == 200) {
        console.log(res)
        this.toastr.success(res['message'], "Success")
      } 
      this.btnLoading = false;
    })

  }

}
