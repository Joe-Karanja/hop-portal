import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { HttpService } from '../../shared/http.service';

import { AddTemplateComponent } from '../add-template/add-template.component';

@Component({
  selector: 'app-sms-configs',
  templateUrl: './sms-configs.component.html',
  styleUrls: ['./sms-configs.component.scss']
})
export class SmsConfigsComponent implements OnInit {

  addSmsBool: boolean = false; 
  availableTemplates: any[];
  cardTitle: string;
  columnsJSON: any = {};
  displayColumns: string[];
  editSmsBool: boolean = false;
  loading: boolean = false;
  mandatoryColumns: string[] = ["Template", "Template Type", "Message Type", "CreatedOn"];

  constructor(
    public dialog: MatDialog,
    private _httpService: HttpService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.cardTitle = "SMS Templates";
    this.loadTemplates();
  }

  //retrieves created sms templates
  loadTemplates(): void {
    this.loading = true;
    this._httpService.retrieveRB("api/v1/notification/get-sms-templates").subscribe(res => {
      if (res['status'] === 200) {
        this.availableTemplates = res['data'];
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

  //triggers add sms modal
  triggerModal(data: any): void {
    this.addSmsBool = true;
    const dialogRef = this.dialog.open(AddTemplateComponent, {data: {template: data, addSmsBool: this.addSmsBool}, height: '710px', width: '630px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadTemplates();
    })
  }

  //triggers edit sms modal
  editSMSTemplate(element): void {
    this.editSmsBool = true;
    const dialogRef = this.dialog.open(AddTemplateComponent, {data: {template: element, editSmsBool: this.editSmsBool}, height: '710px', width: '630px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadTemplates();
    })
  }
  
}
