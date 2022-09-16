import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  warningMessage: string;
  addCatBool: Boolean;
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
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private _httpService: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.warningMessage = "NB: You can change the position of any placeholder, but you cannot remove a placeholder";
    this.addCatBool = this.data.addCatBool;
    if (this.data.addCatBool) {
      this.cardTitle = "Add Category";
    } else {
      this.cardTitle = "Edit Category";
    }

    this.form = this.fb.group({
      name: [this.data.template.name !== null ? this.data.template.name: "", Validators.compose([Validators.required])],
    });
  }

  submitData(): void {
    this.loading = true;
    let model = {
      name: this.form.value.name,
    };
    console.log(model)
    this._httpService.postBT("api/v1/business/add-questionnaire-category", model).subscribe(res => {
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

  editCategory(): void{
    this.close()
    this.toastr.success("TODOO", "Success!");
  }

}
