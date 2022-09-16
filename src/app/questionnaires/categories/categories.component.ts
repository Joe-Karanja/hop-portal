import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/http.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddQuestionComponent } from '../add-question/add-question.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  data: any[];
  loading: Boolean = false;

  addCatBool: Boolean = false;

  constructor(
    private _httpService: HttpService,
    private toaster: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.loading = true;
    this._httpService.getBT("api/v1/business/get-questionnaire-category?page=0&size=10")
      .pipe(first())
      .subscribe((res:any) =>{
        if(res["status"] === 200) {
          this.data = res["data"]["content"]
          if (this.data.length > 0) {
            this.loading = false
          }
          console.log(this.data)
        }
    })
  }

  //triggers q modal
  triggerModal(data: any): void {
    this.addCatBool = true;
    const dialogRef = this.dialog.open(AddCategoryComponent, {data: {template: data, addCatBool: this.addCatBool}, height: '300px', width: '600px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadCategories();
    })
  }

  deleteCat(element) {
    this.loading = true;
    let id = element.id;
    let model = {
      id: id
    }
    this._httpService.postBT("api/v1/questionnaire/deactivate-category", model)
      .pipe(first())
      .subscribe((res:any) =>{
        if(res["status"] === 200) {
          this.toaster.success(res.message, "Success!");
          console.log(this.data)
          this.loadCategories();
          this.loading = false
        } else {
          this.toaster.error(res.message, "Error!");
          this.loading = false
        }
    })
  }

  editCat(data: any): void{
    this.addCatBool = false;
    const dialogRef = this.dialog.open(AddCategoryComponent, {data: {template: data, addCatBool: this.addCatBool}, height: '300px', width: '600px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadCategories();
    })
  }

}
