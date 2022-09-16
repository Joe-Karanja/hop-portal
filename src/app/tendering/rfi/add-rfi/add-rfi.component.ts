import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-add-rfi',
  templateUrl: './add-rfi.component.html',
  styleUrls: ['./add-rfi.component.scss']
})
export class AddRfiComponent implements OnInit {
  loading: boolean ;
  categories: any[];
  subCats: any[];
  skills= [];
  
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean'],
  ];
  validateForm!: FormGroup;



  constructor(
    private fb: FormBuilder,
    private _httpService: HttpService,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getCategories()
  }
  getCategories() {
    this._httpService.getUnAuth("api/v1/business/get-business-types?page=0&size=10").subscribe(res => {
      console.log(res)
      if (res['status'] === 200) {
        this.categories = res["data"]["content"]
        this.loading = false;
      }
    })
  }
  initForm() {
    this.validateForm = this.fb.group({
      rfiTitle: [null, [Validators.required]],
      category: [null, [Validators.required]],
      subCategory: [null, [Validators.required]],
      skills: [null, [Validators.required]],
      evaluationCriteriaId: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      attachments: [null, [Validators.required]],
    });
  }

  generateRfi(): void {
    if (this.validateForm.valid) {
      this.skills.push(this.validateForm.controls['skills'].value)
      let model = {
        rfi :{
          rfiTitle: this.validateForm.controls['rfiTitle'].value,
          category: this.validateForm.controls['category'].value.name,
          subCategory: this.validateForm.controls['subCategory'].value,
          infoRequested: {info1: "cdsc"},
          skills: this.skills,
          evaluationCriteriaId: this.validateForm.controls['evaluationCriteriaId'].value,
          dueDate:  this.validateForm.controls['endDate'].value.toISOString().split('T')[0]
        },
        attachments: this.validateForm.controls['attachments'].value
      }

      console.log('submit', model);

      this._httpService.postForm('api/v1/rfi/add-rfi', model).subscribe(res => {
        console.log(res)
        if (res['status'] == 200) {
          this.toaster.success(res.message, "success")
          this.router.navigate(['/tendering/RFI'])
        } else {
          this.toaster.warning(res.message, "warning")
        }
      })

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onChange(result: Date): void {
    console.log('onChange: ', result.toISOString().split('T')[0]);
  }

  getSubs(category: any) {
    console.log(category.id)
    if (category != null) {
      this._httpService.getUnAuth("api/v1/business/get-business-subcategories?page=0&size=10").subscribe(res => {
        if (res['status'] === 200) {
          console.log(res)
          this.subCats = res["data"]["content"]
          this.loading = false;
        }
      })
    }
  }

  handleFiles(event: any) {
    //console.log(event.target?.files[0])
    this.validateForm.patchValue({
      attachments: event.target?.files[0]
    })
    this.validateForm.get('attachments')?.updateValueAndValidity()
    console.log( this.validateForm.controls['attachments'].value)
  }

}
