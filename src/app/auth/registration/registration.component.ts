import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateAccount } from './create-account.helper';
import { HttpService } from '../../shared/http.service';
import { UserDetailsModel } from '../models/user-details.model';
import { BusinessDetailsModel } from '../models/business-details.model';
import { UserModel } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class RegistrationComponent implements OnInit {

  isLinear = false;
  @Input() defaultValues!: Partial<ICreateAccount>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  loading: boolean = false;
  categoriesLoading: boolean = true;

  businessTypes:any[];
  businessSubTypes:any[];

  buyer = false;
  seller = false;
  private selectedFile: File;

  //file names
  kraName: any = "Upload KRA Certificate";
  regName: any = "Upload Registration Certificate";
  vatName: any = "Upload VAT Certificate";

  //formChecks
  isValid: Boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForms()
    this.getbusinessTypes()
    this.getbusinessSubTypes()
  }
  getbusinessTypes() {
    this.categoriesLoading = true;
    
    this._httpService.getUnAuth("api/v1/business/get-business-types?page=0&size=10").subscribe(res => {
      if (res['status'] === 200) {
        console.log(res)
        this.businessTypes = res["data"]["content"]
        this.categoriesLoading = false;
      }
    })
  }
  
  getbusinessSubTypes() {
    //this.loading = true;
    this._httpService.getUnAuth("api/v1/business/get-business-subcategories?page=0&size=10").subscribe(res => {
      if (res['status'] === 200) {
        console.log(res)
        this.businessSubTypes = res["data"]["content"]
        this.loading = false;
      }
    })
  }
  initForms() {
    this.firstFormGroup = this._formBuilder.group({
      businessType:  ['dwd', Validators.required],
      businessSubsector: ['dwd', Validators.required],
      businessName: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      businessPhoneNumber: ['', Validators.required],
      businessEmail:  ['', Validators.required],
      //businessAdress:  ['', Validators.required],
      isSupplier: [false ],
      isBuyer: [true],
      isBothSupplierBuyer: [false],
    }); 
    this.secondFormGroup = this._formBuilder.group({
      userFirstName: ['',  [Validators.required],],
      userPhoneNumber: ['', [Validators.required]],
      userLastName: ['', [Validators.required]],
      userEmail: ['', [Validators.required]],
    });

    this.thirdFormGroup = this._formBuilder.group({
      businessDetails: ['', [Validators.required]],
      businessCapacity: [  '',  [Validators.required],],
      yearsOfExperience: [  '',  [Validators.required],],
      kraPin: [  '',  [Validators.required],],
    });

    this.forthFormGroup = this._formBuilder.group({
      vatForm: ['', [Validators.required]],
      kraForm: ['', [Validators.required]],
      businessForm: ['', [Validators.required]],
    });

  }

  onboardUser() {
    this.loading = true;

    const userDetails = new UserDetailsModel();
    userDetails.userLastName = this.secondFormGroup.controls['userLastName'].value;
    userDetails.userFirstName = this.secondFormGroup.controls['userFirstName'].value;
    userDetails.userEmail = this.secondFormGroup.controls['userEmail'].value;
    userDetails.userPhoneNumber = this.secondFormGroup.controls['userPhoneNumber'].value;

    const businessDetails = new BusinessDetailsModel();
    businessDetails.businessType = this.firstFormGroup.controls['businessType'].value; 
    businessDetails.businessSubsector = this.firstFormGroup.controls['businessSubsector'].value; 
    businessDetails.businessName = this.firstFormGroup.controls['businessName'].value;
    businessDetails.businessPhoneNumber = this.firstFormGroup.controls['businessPhoneNumber'].value;
    businessDetails.businessAdress = '123';//this.firstFormGroup.controls['businessAdress'].value;
    businessDetails.businessEmail = this.firstFormGroup.controls['businessEmail'].value;
    businessDetails.kraPin = this.thirdFormGroup.controls['kraPin'].value;
    businessDetails.businessDetails = this.thirdFormGroup.controls['businessDetails'].value;
    businessDetails.businessCapacity = this.thirdFormGroup.controls['businessCapacity'].value;
    businessDetails.yearsOfExperience = this.thirdFormGroup.controls['yearsOfExperience'].value;
    businessDetails.isBuyer = this.firstFormGroup.controls['isBuyer'].value;
    businessDetails.isSupplier = this.firstFormGroup.controls['isSupplier'].value;
    businessDetails.isBothSupplierBuyer = businessDetails.isBuyer == true && businessDetails.isSupplier == true ? true : false;

    const newUser = new UserModel();
    newUser.userDetails = userDetails;
    newUser.businessDetails = businessDetails;
    newUser.vatForm = this.forthFormGroup.controls['vatForm'].value;
    newUser.kraForm = this.forthFormGroup.controls['kraForm'].value;
    newUser.businessForm = this.forthFormGroup.controls['businessForm'].value;

    console.log(newUser)

    this._httpService.postOnboard("api/v1/onboarding", newUser).pipe(first()).subscribe(res => {
      if (res['status'] === 200) {
        console.log(res)
        this.toaster.success(res.message, "success")
        this.router.navigate(['/auth/login']);
        this.loading = false;
      } else {
        this.toaster.error(res.message, 'Error')
        this.loading = false;
      }
    })
  };

  onBuyerChange(event:any) {
    this.firstFormGroup.patchValue({
      isBuyer: event.checked
    })
    this.firstFormGroup.get('isBuyer')?.updateValueAndValidity()
  }

  onSupplierChange(event:any) {
    this.firstFormGroup.patchValue({
      isSupplier: event.checked
    })
    this.firstFormGroup.get('isSupplier')?.updateValueAndValidity()
  }

  handleVatFile(event: any) {
    this.forthFormGroup.patchValue({
      vatForm: event.target?.files[0]
    })
    this.forthFormGroup.get('vatForm')?.updateValueAndValidity()
    this.vatName = event.target.files[0].name + ", "+ (event.target.files[0].size/1000).toFixed(3) + "KBs" 
  }
  handleKraFile(event: any) {
    this.forthFormGroup.patchValue({
      kraForm: event.target?.files[0]
    })
    this.forthFormGroup.get('kraForm')?.updateValueAndValidity()
    this.kraName = event.target.files[0].name + ", "+ (event.target.files[0].size/1000).toFixed(3) + "KBs" 
  }
  handleRegFile(event: any) {
    this.forthFormGroup.patchValue({
      businessForm: event.target?.files[0]
    })
    this.forthFormGroup.get('businessForm')?.updateValueAndValidity()
    this.regName = event.target.files[0].name + ", "+ (event.target.files[0].size/1000).toFixed(3) + "KBs" 
  }

}
