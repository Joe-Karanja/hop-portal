import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AddQuestionComponent } from 'src/app/questionnaires/add-question/add-question.component';
import { HttpService } from 'src/app/shared/http.service';
import { AddSubTypeComponent } from './add-sub-type/add-sub-type.component';
import { AddTypesComponent } from './add-types/add-types.component';

@Component({
  selector: 'app-business-categories',
  templateUrl: './business-categories.component.html',
  styleUrls: ['./business-categories.component.scss']
})
export class BusinessCategoriesComponent implements OnInit {
  data: any[];
  subTypes: any;
  loading: Boolean = false;

  addTypeBool:Boolean = false;
  addSubTypeBool: Boolean = false;
  constructor(
    private _httpService: HttpService,
    private toaster: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadTypes();
    this.loadSubTypes();
  }

  loadTypes() {
    this.loading = true;
    this._httpService.getBT("api/v1/business/get-business-types?page=0&size=10")
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

  loadSubTypes() {
    this.loading = true;
    this._httpService.getBT("api/v1/business/get-business-subcategories?page=0&size=10")
      .pipe(first())
      .subscribe((res:any) =>{
        if(res["status"] === 200) {
          this.subTypes = res["data"]["content"]
          if (this.subTypes.length > 0) {
            this.loading = false
          }
          console.log(this.subTypes)
        }
    })
  }

  //triggers q modal
  triggerModal(data: any): void {
    this.addTypeBool = true;
    const dialogRef = this.dialog.open(AddTypesComponent, {data: {template: data, addSmsBool: this.addTypeBool}, height: '300px', width: '600px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadTypes();
    })
  }

  triggerSubModal(data: any): void {
    this.addSubTypeBool = true;
    const dialogRef = this.dialog.open(AddSubTypeComponent, {data: {template: data, addSubTypesBool: this.addSubTypeBool}, height: '600px', width: '600px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadSubTypes();
    })
  }

}
