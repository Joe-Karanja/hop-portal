import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-profile-questionnaires',
  templateUrl: './profile-questionnaires.component.html',
  styleUrls: ['./profile-questionnaires.component.scss']
})
export class ProfileQuestionnairesComponent implements OnInit {

  idBusiness: any; 
  loading: boolean;
  responses: any[]
  questions: any[]
  userType: string
  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstance: string }> = [];

  //file
  fileName: string = "Add Attachment"
  attachment: any = null;
  
  constructor(
    private _httpService: HttpService, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.idBusiness = localStorage.getItem('businessId')
    this.validateForm = this.fb.group({});
    this.addField();
    this.getQuestions()
    console.log(this.attachment)
  }

  getQuestions() {
    this.loading = true
    const profiles = JSON.parse(localStorage.getItem('profiles'));
    for(let i = 0; i < profiles.length; i++) {
      if (profiles.includes('BUSINESS_SELLER') && !profiles.includes('BUSINESS_BUYER')) {
        this.userType = 'supplier';
      } else if (profiles.includes('BUSINESS_BUYER')){
        this.userType = 'buyer';
        continue
      } else if (profiles.includes('BUSINESS_BUYER') && profiles.includes('BUSINESS_SELLER')){
        this.userType = 'supplier_buyer';
      } 
    }
    this._httpService.getBT(`api/v1/questionnaire/get-questions-by-type/${this.userType}?page=0&size=10`)
    .pipe(first())
    .subscribe((res:any) =>{
      if(res["status"] === 200) {
        console.log(res)
        this.questions = res["data"];
        this.getResponses()
      } else {
        this.loading = false;
        this.toastr.error(res.message, "Error");
      }
    })
  }

  getResponses() {
    this.loading = true
    this._httpService.getBT(`api/v1/questionnaire/get-business-answers/${this.idBusiness}?page=0&size=10`)
    .pipe(first())
    .subscribe((res:any) =>{
      if(res["status"] === 200) {
        console.log(res)
        this.responses = res["data"];
      } else {
        this.toastr.error("Profiles cannot be retrieved", "Error");
      }
      this.loading = false;
    })
  }

  //questionnaires
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `answer${id + 1}`
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  submitForm(data): void {
    this.loading = true
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      let model = {
        businessId: parseInt(this.idBusiness),
        questionId: data.id,
        answers:this.validateForm.value
      }
      let attachment = this.attachment;
      console.log(JSON.stringify(model))
      this._httpService.postAns('api/v1/questionnaire/add-answer', JSON.stringify(model), attachment).pipe(first())
      .subscribe((res:any) =>{
        this.toastr.success(res.message, "Success!")
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.loading = false
  }

  getActiveQuestion(event: any){
    console.log(event)
  }

  handleFileInput(event: any) {
    this.attachment = event.target?.files[0]
    this.fileName = event.target.files[0].name + ", "+ (event.target.files[0].size/1000).toFixed(3) + "KBs" 
  }
}
