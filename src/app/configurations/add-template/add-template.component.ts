import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { HttpService } from '../../shared/http.service';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss']
})
export class AddTemplateComponent implements OnInit {

  addEmail: boolean;
  addSMS: boolean;
  availableTemplateTypes: any[];
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
    public dialogRef: MatDialogRef<AddTemplateComponent>,
    private _httpService: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  /** Add subject, description, and from fields to email; re-add ngx-quill configurations 
   * only description will be added to both sms and email, the rest are just for email
  */

  ngOnInit(): void {
    this.warningMessage = "NB: You can change the position of any placeholder, but you cannot remove a placeholder";
    this.addEmail = this.data.addEmailBool;
    this.addSMS = this.data.addSmsBool;
    if (this.data.editEmailBool) {
      this.cardTitle = "Edit Email Template";
    } else if (this.addEmail) {
      this.cardTitle = "Create a New Email Template";
    } else if (this.addSMS) {
      this.cardTitle = "Create a New SMS Template;"
    } else {
      this.cardTitle = "Edit SMS Template"
    }
    this.editEmailBool = this.data.editEmailBool;
    this.loadTypes();
    this.form = this.fb.group({
      templateType: [this.data.template ? this.data.template.type : "", Validators.compose([Validators.required])],
      template: [this.data.template ?  this.data.template.message : "", Validators.compose([Validators.required])],
      description: [this.data.template ? this.data.template.description : "", Validators.compose([Validators.required])],
      isActive: [this.data.template ? this.data.template.active.toString() : "false", Validators.compose([Validators.required])]
    });
    
    if (this.data.editEmailBool) {
      this.form.addControl("subject", new FormControl('', Validators.required));
      this.form.patchValue({
        subject: this.data.template.subject,
      });
    }

    if (this.addEmail || this.data.editEmailBool) {
      this.form.addControl("subject", new FormControl('', Validators.required));
    } else {
      this.form.removeControl("subject");
    }
  }

  //retrieves available template types
  loadTypes(): void {
    this._httpService.get("api/v1/notification/get-template-types").subscribe(res => {
      if (res["status"] === 200) {
        this.availableTemplateTypes = res["data"];
      }
    })
  }

  //creates new sms template
  submitData(): void {
    this.loading = true;
    let activeStatus = this.form.value.isActive == "true" ? true : false;
    let model = {
      templateType:this.form.value.templateType,
      template: this.form.value.template,
      description: this.form.value.description,
      isActive: activeStatus
    };
    this._httpService.post("user-management/api/v1/notification/add-sms-message-template", model).subscribe(res => {
      if (res["status"] === 200) {
        this.loading = false;
        this.close();
        this.toastr.success("Template created", "Success!");
      } else {
        this.loading = false;
        this.errorMessage = res['message'];
      }
    })
  }

  //creates new email template
  addEmailTemplate(): void {
    this.loading = true;
    let activeStatus = this.form.value.isActive == "true" ? true : false;
    let model = {
      templateType:this.form.value.templateType,
      template: this.form.value.template,
      description: this.form.value.description,
      subject: this.form.value.subject,
      isActive: activeStatus
    };
    this._httpService.post("user-management/api/v1/notification/add-email-message-template", model).subscribe(res => {
      if (res["status"] === 200) {
        this.loading = false;
        this.close();
        this.toastr.success("Template created", "Success!");
      } else {
        this.loading = false;
        this.errorMessage = res["message"];
      }
    })
  }

  //edits email templates
  editEmailTemplate(): void {
    this.loading = true;
    let activeStatus = this.form.value.isActive == "true" ? true : false;
    let model = {
      id: this.data.template.id,
      templateType:this.form.value.templateType,
      template: this.form.value.template,
      description: this.form.value.description,
      subject: this.form.value.subject,
      isActive: activeStatus
    };
    this._httpService.post("user-management/api/v1/notification/edit-email-template", model).subscribe(res => {
      if (res["status"] === 200) {
        this.loading = false;
        this.close();
        this.toastr.success("Template details updated", "Success!");
      } else {
        this.loading = false;
        this.errorMessage = res["message"];
      }
    })
  }

  //edits sms template details
  editSMS(): void {
    this.loading = true;
    let activeStatus = this.form.value.isActive == "true" ? true : false;
    let model = {
      id: this.data.template.id,
      templateType:this.form.value.templateType,
      template: this.form.value.template,
      description: this.form.value.description,
      isActive: activeStatus
    };
    this._httpService.post("user-management/api/v1/notification/edit-sms-template", model).subscribe(res => {
      if (res["status"] === 200) {
        this.loading = false;
        this.close();
        this.toastr.success("Template details updated", "Success!");
      } else {
        this.loading = false;
        this.errorMessage = res["message"];
      }
    })
  }

  //closes dialog
  close(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 500);
  }
}
