import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { HttpService } from 'src/app/shared/http.service';
import { AddQuestionComponent } from '../add-question/add-question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  data: any[];
  questions: any;
  loading: boolean ;
  current = 0;
  index: number;
  

  //Modal
  addQBool: Boolean;

  constructor(
    private _httpService: HttpService,
    private toaster: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    //this.loadQuestions();
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
            this.changeContent(this.data[this.current])
          }
          this.loading = false
        }
      })
  }

  changeContent(category: any): void {
    this.loading = true
    this._httpService.getBT(`api/v1/questionnaire/get-questions-by-category/${category.name}`)
    .pipe(first())
    .subscribe((res:any) =>{
      if (res["status"] === 200) {
        this.questions= res["data"]
        this.index = this.questions.length
      }
    })
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }

  delete(element) {
    this.loading = true;
    let id = element.id;
    alert(id)
    let model = {
      id: id
    }
    this._httpService.postBT("api/v1/questionnaire/delete-question/"+id, model)
      .pipe(first())
      .subscribe((res:any) =>{
        if(res["status"] === 200) {
          this.toaster.success(res.message, "Success!");
          console.log(this.data)
          this.loading = false
          this.loadCategories()
        } else {
          this.toaster.error(res.message, "Error!");
          this.loading = false
        }
    })
  }

  //triggers q modal
  triggerModal(data: any, addQBool: true): void {
    this.addQBool = true;
    const dialogRef = this.dialog.open(AddQuestionComponent, {data: {template: data, addQBool: addQBool}, height: '700px', width: '600px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadCategories();
    })
  }
}
