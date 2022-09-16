import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { HttpService } from "../../shared/http.service";

import { AddTemplateComponent } from "../add-template/add-template.component";

@Component({
  selector: 'app-email-configs',
  templateUrl: './email-configs.component.html',
  styleUrls: ['./email-configs.component.scss']
})
export class EmailConfigsComponent implements OnInit {

  addEmailDetails: boolean = false;
  availableTemplates: any[];
  cardTitle: string;
  columnsJSON: any = {};
  editEmailDetails: boolean = false;
  loading: boolean = false;
  message: string;
  templateDetails: any;

  constructor(
    public dialog: MatDialog,
    private _httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.cardTitle = "Email Templates";
    this.loadTemplates();
  }

  //retrieves created sms templates
  loadTemplates(): void {
    this.loading = true;
    this._httpService.retrieveRB("api/v1/notification/get-email-templates").subscribe(res => {
      if (res['status'] === 200) {
        this.availableTemplates = res['data'];
        this.availableTemplates.map(temp => {
          this.message = temp["message"]
        })
        let columns = [];
        this.availableTemplates.map(temp => {
          Object.keys(temp).map(it => {
            columns.push(it)
          })
        });
        columns = Array.from(new Set(columns));
        columns.map(col => {
          switch(col) {
            case "id":
              this.columnsJSON["ID"] = "id";
              break;
            case "createdOn":
              this.columnsJSON["CreatedOn"] = "createdOn";
              break;
            case "message":
              this.columnsJSON["Template"] = "message";
              break;
            case "messageType":
              this.columnsJSON["Template Type"] = "messageType";
              break;
            case "type":
              this.columnsJSON["Message Type"] = "type";
              break;
          }
        })
        this.loading = false;
      }
    })
  }

  //edits email details
  editEmail(element): void {
    this.templateDetails = element;
    this.editEmailDetails = true;
    const dialogRef = this.dialog.open(AddTemplateComponent, {data: {template: this.templateDetails, editEmailBool: this.editEmailDetails}, height: "780px", width: "680px", disableClose: true});
    dialogRef.afterClosed().subscribe(res => {
      //console.log("dialog close res: ", res);
      this.loadTemplates();
    })
  }

  //adds email details
  addEmail(data:  any): void {
    this.templateDetails = data;
    this.addEmailDetails = true;
    const dialogRef = this.dialog.open(AddTemplateComponent, {data: {template: this.templateDetails, addEmailBool: this.addEmailDetails}, height: "780px", width: "680px", disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadTemplates();
    })
  }
}
