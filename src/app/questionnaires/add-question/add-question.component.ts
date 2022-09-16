import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  addQBool: boolean;
  addSMS: boolean;
  availableTemplateTypes: any[];
  availableCategories: any[];
  cardTitle: string;
  editEmailBool: boolean = false;
  errorMessage: string;
  form: FormGroup;
  loading: boolean = false;
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean'],
  ];
  warningMessage: string;

  constructor(
    public dialogRef: MatDialogRef<AddQuestionComponent>,
    private _httpService: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.warningMessage = "NB: You can change the position of any placeholder, but you cannot remove a placeholder";
    this.addQBool = this.data.addQBool;
    if (this.data.addQBool) {
      this.cardTitle = "Add Question";
    } else {
      this.cardTitle = "Edit Question"
    }
    this.editEmailBool = this.data.editEmailBool;
    console.log(this.data.template)
    this.loadCategories(); 
    this.form = this.fb.group({
      questionType: [this.data.template != '' ? this.data.template.questionType : "", Validators.compose([Validators.required])],
      question: [ this.data.template != '' ? this.data.template.question : "" , Validators.compose([Validators.required])],
      questionCategory: [ this.data.template != '' ? this.data.template.questionCategory : "", Validators.compose([Validators.required])],
      forSupplier: [ this.data.template != '' ? this.data.template.forSupplier : false, Validators.compose([Validators.required])],
      forBuyer: [this.data.template != '' ? this.data.template.forBuyer : false, Validators.compose([Validators.required])],
      forBothBuyerandSupplier: [ this.data.template != '' ? this.data.template.forBothBuyerandSupplier : false, Validators.compose([Validators.required])],
      includeAttachment: [this.data.template != '' ? this.data.template.includeAttachment : false, Validators.compose([Validators.required])]
    });

    if (this.data.template != '') {
      if(this.data.template.forBuyer) {
        this.form.patchValue({
          forBuyer: "Buyer"
        })
        this.form.get('forBuyer')?.updateValueAndValidity()   
      }
      if(this.data.template.forSupplier) {
        this.form.patchValue({
          forBuyer: "Supplier"
        })
        this.form.get('forBuyer')?.updateValueAndValidity()   
      }
      if(this.data.template.forBothBuyerAndSupplier) {
        this.form.patchValue({
          forBuyer: "Both"
        })
        this.form.get('forBuyer')?.updateValueAndValidity()   
      }
    }
    // alert(this.form.valid)
  }

  
  //retrieves available categories
  loadCategories(): void {
    this._httpService.getBT("api/v1/business/get-questionnaire-category?page=0&size=10").subscribe(res => {
      if (res["status"] === 200) {
        this.availableCategories = res["data"]["content"];
        console.log(res)
      }
    })
  }

  //creates new sms template
  submitData(): void {
    this.loading = true;
    let activeStatus = this.form.value.isActive == "true" ? true : false;
    let model = {
      question: this.form.value.question,
      questionType: this.form.value.questionType,
      includeAttachment: this.form.value.includeAttachment,
      questionCategory: this.form.value.questionCategory,
      forSupplier: this.form.value.forBuyer == 'Supplier' ? true: false,
      forBuyer: this.form.value.forBuyer == 'Buyer' ? true: false,
      forBothBuyerAndSupplier: this.form.value.forBuyer == 'Both' ? true: false,
    };
    // console.log(model)
    this._httpService.postBT("api/v1/questionnaire/add-question", model).subscribe(res => {
      if (res["status"] === 200) {
        this.loading = false;
        this.close();
        this.toastr.success(res.message, "Success!");
      } else {
        this.loading = false;
        this.toastr.error(res.message, "Error!");
        this.errorMessage = res['message'];
      } 
    })
    this.loading = false
  }

  //closes dialog
  close(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 500);
  }

  onSelectChange(event: any) {
    this.form.patchValue({
      includeAttachment: event.target?.checked
    })
    this.form.get('includeAttachment')?.updateValueAndValidity()
  }
}
