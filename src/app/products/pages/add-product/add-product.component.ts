import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { first } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  loading: boolean = false;
  tagValue = ['a10', 'c12', 'tag'];
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean'],
  ];

  fileList: FileList;
  previewImage: string | undefined = '';
  previewVisible = false;
  productCategories: any[];
  subCats: any[];
  catId: any;
  imageUrl: any;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
    if (!file.url && !file.preview) {
      alert('file')
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  constructor(
    private fb: FormBuilder,
    private _httpService: HttpService,
  ) { }

  validateForm!: FormGroup;

  ngOnInit(): void {
    this.getCategories()
    this.initForm()
  }
  initForm() {
    this.validateForm = this.fb.group({
      productName: [null, [Validators.required]],
      categoryName: [null, [Validators.required]],
      subCategoryName: [null, [Validators.required]],
      tag: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
      // image1: [null, [Validators.required]],
      // image2: [null, [Validators.required]]
    });  
  }

  getCategories() {
    this._httpService.getP("api/v1/product/get-product-categories?page=0&size=10")
      .pipe(first())
      .subscribe((res:any) =>{
        if(res["status"] === 200) {
          this.productCategories = res["data"]["content"]
        }
    })
  }

  getSubCats(id: any) {
    alert("called")
    this.loading = true;
    this._httpService.getP(`api/v1/product/get-sub-product-categories/${id}?page=0&size=10`)
      .pipe(first())
      .subscribe((res:any) =>{
        if(res["status"] === 200) {
          this.subCats = res["data"]["content"]
        }
    })
  }

  submitForm(): void {
    //tags
    let tagArr = [];
    tagArr.push(this.validateForm.controls['tag'].value)

    //images
    let model = {
      product_images : this.fileList,
      product: {
        productName: this.validateForm.controls['productName'].value,
        categoryName: this.validateForm.controls['categoryName'].value.name,
        subCategoryName: this.validateForm.controls['subCategoryName'].value,
        price: parseInt(this.validateForm.controls['price'].value),
        tags: tagArr,
        description: this.validateForm.controls['description'].value,
      } 
    }
    console.log('submit', model)
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this._httpService.postProducts("api/v1/product/add-product", model).subscribe(res => {
        if (res["status"] === 200) {
          console.log(res)
        }
        console.log(res)
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

  getSubs(category: any) {
    console.log(category.id)
    if (category != null) {
      this._httpService.getP(`api/v1/product/get-sub-product-categories/${category.id}?page=0&size=10`)
      .pipe(first())
      .subscribe((res:any) =>{
        if(res["status"] === 200) {
          this.subCats = res["data"]["content"]
          this.loading = false
          console.log(res)
        }
    })
    }
  }

  handleFiles(event: any) {
    console.log(event.target?.files)
    this.fileList = event.target?.files
    for (var i = 0; i < event.target.files.length; i++) {
      console.log(event.target.files[i].name);
    }
    // this.validateForm.patchValue({
    //   image1: event.target?.files[0]
    // })
    // this.validateForm.get('image1')?.updateValueAndValidity()
    // console.log( this.validateForm.controls['image1'].value)
  }

  handleFiles1(event: any) {
    console.log(event.target?.files[0])
    var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageUrl = event.target.result;
      }
    // this.fileList = event.target?.files
    // this.imageUrl = URL.createObjectURL(event.target?.files[0])
    console.log(this.imageUrl)
  }

}
