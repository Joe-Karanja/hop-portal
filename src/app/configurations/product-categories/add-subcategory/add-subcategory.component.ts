import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent implements OnInit {

  warningMessage: string;
  addSubTypesBool: Boolean;
  cardTitle: string;
  editEmailBool: boolean = false;
  errorMessage: string;
  form: FormGroup;
  businessTypes: any[];
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
    public dialogRef: MatDialogRef<AddSubcategoryComponent>,
    private _httpService: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.warningMessage = "NB: You can change the position of any placeholder, but you cannot remove a placeholder";
    this.addSubTypesBool = this.data.addSubTypesBool;
    if (this.data.addSubTypesBool) {
      this.cardTitle = "Add Sub Type";
    } else {
      this.cardTitle = "Edit ";
    }

    this.form = this.fb.group({
      name: [this.data.template ? this.data.template.name : "", Validators.compose([Validators.required])],
      id: [this.data.template ? this.data.template.id : "", Validators.compose([Validators.required])],
    });

    this.getCategories()
  }

  getCategories() {
    this.loading = true
    this._httpService.getP("api/v1/product/get-product-categories?page=0&size=10").subscribe(res => {
      if (res['status'] === 200) {
        this.businessTypes = res["data"]["content"]
        this.loading = false;
      }
    })
  }

  submitData(): void {
    this.loading = true;
    let model = {
      name: this.form.value.name,
      productCategoryId: this.form.value.id
    };
    console.log(model)
    this._httpService.getProducts("api/v1/product/add-product-sub-category", model).subscribe((res:any) => {
      console.log(res)
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
