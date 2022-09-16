import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-add-types',
  templateUrl: './add-types.component.html',
  styleUrls: ['./add-types.component.scss']
})
export class AddTypesComponent implements OnInit {
  warningMessage: string;
  addTypesBool: Boolean;
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

  constructor(
    public dialogRef: MatDialogRef<AddTypesComponent>,
    private _httpService: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.warningMessage = "NB: You can change the position of any placeholder, but you cannot remove a placeholder";
    this.addTypesBool = this.data.addTypeBool;
    if (this.data.addTypesBool) {
      this.cardTitle = "Add Type";
    } else {
      this.cardTitle = "Edit ";
    }

    this.form = this.fb.group({
      name: [this.data.template ? this.data.template.name : "", Validators.compose([Validators.required])],
    });
  }

  submitData(): void {
    this.loading = true;
    let model = {
      name: this.form.value.name,
    };
    console.log(model)
    this._httpService.postBT("api/v1/business/add-business-type", model).subscribe(res => {
      if (res["status"] === 200) {
        this.loading = false;
        this.close();
        this.toastr.success(res.message, "Success!");
      } else {
        this.loading = false;
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

}
