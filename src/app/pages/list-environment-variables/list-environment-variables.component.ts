/*
 * Author: David Njuguna Nyongo (njugunad85@gmail.com)
 * Copyright (c) 2021 
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpService } from '../../shared/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as XLSX from 'xlsx';

interface KeyParam {
  key: string;
  value: string;
  env: string;
  createdOn: string;
}

@Component({
  selector: 'app-list-environment-variables',
  templateUrl: './list-environment-variables.component.html',
  styleUrls: ['./list-environment-variables.component.scss']
})
export class ListEnvironmentVariablesComponent implements OnInit {
  @ViewChild('modalRef', { static: true }) any;
  total = 1;
  columnsToExport: string[] = [];
  checkedColumn;
  indicatedColumns: string[];
  exportEntries: any[];
  data: KeyParam[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  searchValue = '';
  showColumn: boolean =  true;
  visible = false;
  filterEnv = [
    { text: 'DEV', value: 'DEV' },
    { text: 'TEST', value: 'TEST' },
    { text: 'STAGING', value: 'STAGING' },
    { text: 'PROD', value: 'PROD' }
  ];

  form: FormGroup;
  errorMessage: string;
  loadDataFromServer(): void {

    let filters = {
      "page": this.pageIndex - 1,
      "size": this.pageSize
      // "sortField": "id",
      // "sortOrder": "desc",
      // "filter": {
      //   username: 'dav',
      // }
    }
    this.loading = true;
    this.httpService.postVariables('esb-service-manager/get-enviroment-variables', filters).subscribe(result => {
      this.loading = false;
      this.total = result.data.totalElements;
      this.data = result.data.content;
      let cols = [];
      this.data.map(item => {
        Object.keys(item).map(it => {
          cols.push(it.toUpperCase());
        })
      });
      this.columnsToExport = Array.from(new Set(cols));
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    // const { pageSize, pageIndex, sort, filter } = params;
    // const currentSort = sort.find(item => item.value !== null);
    // const sortField = (currentSort && currentSort.key) || null;
    // const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer();
  }

  constructor(
    private httpService: HttpService, 
    private message: NzMessageService,
    private fb: FormBuilder, 
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.loadDataFromServer();
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  search(): void {
    this.visible = false;
    this.data = this.data.filter((item: any) => item.name.indexOf(this.searchValue) !== -1);
  }
  // Form
  addEditRecord(tplTitle, tplContent, tplFooter, rec?): void {
    this.errorMessage = "";
    this.form = this.fb.group({
      key: [rec ? rec.key : '', [Validators.required]],
      value: [rec ? rec.value : '', [Validators.required]],
      env: [rec ? rec.env : '', [Validators.required]]
    });
    this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: rec,
      nzOnOk: () => console.log('Click ok')
    });
  }
  deleteRow(): void {

  }

  selectedColumns(event): void {
    console.log("Selected column: ", event);
    // console.log(this.data);
    this.indicatedColumns = event;
    let rentries = [];
    this.indicatedColumns.map(col => {
      if (col == "CREATEDON") {
        rentries.push("createdOn")
      } else if (col == "SOFTDELETE") {
        rentries.push("softDelete")
      }else {
        rentries.push(col.toLowerCase());
      }
    })
    let testEntries = [];
    this.data.map(item => {
      let container = {};
      rentries.map(it => {
        container[it] = item[it];
        testEntries.push(container);
      })
    })
    console.log("we have a container?", testEntries);
    this.exportEntries = testEntries;
  }

  //exports variables in xlsx
  exportDataXlsx(exportArray): void {
    let doc = exportArray;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(doc);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Environment-Variables');
    XLSX.writeFile(wb, 'Environment-Variables.xlsx');
  }

  submit(params?): void {
    this.httpService.post('esb-service-manager/create-environment-variable', this.form.value).subscribe((res) => {
      if (res.status === 200) {
        this.message.create('success', `Created successfully`);
        this.modalService.closeAll();
        this.loadDataFromServer()
      } else {
      this.errorMessage = res.message;
      }
    })
  }
  saveChanges(params?): void {
    this.form.value.id = params.id;
    this.form.value.createdOn = params.createdOn;
    this.form.value.softDelete = params.softDelete;
    this.httpService.post('esb-service-manager/create-environment-variable', this.form.value).subscribe((res) => {
      if (res.status === 200) {
        this.message.create('success', `Changes Saved successfully`);
        this.modalService.closeAll();
        this.loadDataFromServer()
      }
    })
  }

}
