import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastrService } from 'ngx-toastr';
import { DataExportationService } from 'src/app/shared/data-exportation.service';
import { GlobalService } from 'src/app/shared/global.service';
import { HttpService } from 'src/app/shared/http.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { AssignProfileComponent } from '../assign-profile/assign-profile.component';
import { User } from '../models/user';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  
  cardTitle: string;
  columnsToDisplay: any = {};
  _data: any[] = [];
  data: any;
  dataToExport: any[];
  endDate: string;
  exportTitle: string;
  loading: boolean = false;
  mandatoryColumns = ["First Name", "Last Name", "Email", "Phone Number", "Status", "Blocked", "Pending Action", "CreatedOn"];
  model: User = new User();
  page: number = 1;
  perPage: number = 10;
  profiles: any[] = [];
  selection = new SelectionModel<any>(true, []);
  startDate: string;
  total: number;
  updateUser: boolean;
  userColumns: any;
  userDetails: any;
  userExportColumns: string[];
  userExportRows: any[];
  //search
  searchValue = '';
  visible = false;
  listOfDisplayData = [...this._data];

  constructor(
    public dialog: MatDialog,
    private _dataExportationService: DataExportationService,
    private _globalService: GlobalService,
    private _httpService: HttpService,
    private router: Router,
    private toaster: ToastrService
  ) {
    let today = new Date;
    this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-13).toISOString().slice(0,10);
    this.endDate = new Date().toISOString().slice(0,10);
   }

  ngOnInit(): void {
    this.loadData();
  }

  //opens user creation modal
  triggerModal(data: any): void {
    this.updateUser = false;
    this.userDetails = data;
    const dialogRef = this.dialog.open(AddUserComponent, {data: {data: this.userDetails, updateUser: this.updateUser}, height: '570px', width: '570px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      //console.log("form data: ", data);
      this.loadData();
    })
  }

  //open user update modal
  editUser(data: any): void {
    this.userDetails = data;
    this.updateUser = true;
    const dialogRef = this.dialog.open(AddUserComponent, {data: {data: this.userDetails, updateUser: this.updateUser}, height: '570px', width: '570px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    })
  }
  
  //retrieves all created users
  loadData(): void {
    this.loading = true;
    this.cardTitle = "Admin Users List";
    let model = {
      page: (this.page - 1),
      size: this.perPage
    }
    this._httpService.retrieveData('api/v1/user/get-hop-users', model).subscribe(res => {
      if(res['status'] === 200) {
        this._data = res['data']['content'];
        //console.log("created users: ", this._data);
        let columnsList = [];
        this._data.map(item => {
          Object.keys(item).map(it => {
            columnsList.push(it);
          })
        })
        columnsList = Array.from(new Set(columnsList));
        columnsList.map(item => {
          switch(item) {
            case "id":
              this.columnsToDisplay['ID'] = "id";
              break;
            case "createdOn":
              this.columnsToDisplay["CreatedOn"] = "createdOn";
              break;
            case "email":
              this.columnsToDisplay["Email"] = "email";
              break;
            case "phoneNumber":
              this.columnsToDisplay["Phone Number"] = "phoneNumber";
              break;
            case "firstName":
              this.columnsToDisplay["First Name"] = "firstName";
              break;
            case "lastName":
              this.columnsToDisplay["Last Name"] = "lastName";
              break;
            case "remarks":
              this.columnsToDisplay["Remarks"] = "remarks";
              break;
            case "firstTimeLogin":
              this.columnsToDisplay["Status"] = "firstTimeLogin";
              break;
            case "isBlocked":
              this.columnsToDisplay["Blocked"] = "isBlocked";
              break;
            default:
              this.columnsToDisplay["Pending Action"] = "beingEdited";
              break;
          }
        });
        this.userColumns = Object.keys(columnsList);        
        this.loading = false;
        this.total = res['data']['totalElements'];
      } else {
        this.toaster.error('Users cannot be retrieved at the moment', 'Error!')
      }
      
    })
  }

  //updates request params
  onQueryParamsChange(params: NzTableQueryParams): void {
    const {pageSize, pageIndex} = params;
    this.page = pageIndex;
    this.perPage = pageSize;
    this.loadData();
  }

  //exports users xlsx
  exportXLSX(): void {
    let usersToExport = [];
    this._data.map(item => {
      if (item["firstTimeLogin"]) {
        item["firstTimeLogin"] = "Inactive";
      } else {
        item["firstTimeLogin"] = "Active";
      }
      let container = {};
      this.mandatoryColumns.map(col => {
        container[col] = item[this.columnsToDisplay[col]];
        usersToExport.push(container);
      })
    });
    let entries = this._globalService.getUniqueListBy(usersToExport, "Email");
    this.dataToExport = entries;
    this._dataExportationService.exportDataXlsx(this.dataToExport, "users-list");
  }

  //exports users to pdf
  exportUsersPDF(): void {
    this.mandatoryColumns = this.mandatoryColumns;
    this.exportTitle = "ESB-reporting-portal-users.pdf";
    this.userExportColumns = this.mandatoryColumns;
    this.userExportRows = this._data.map(user => {
      if (user["firstTimeLogin"]) {
        user["firstTimeLogin"] = "Inactive";
      } else {
        user["firstTimeLogin"] = "Active";
      }
      let container = [];
      this.mandatoryColumns.map(col => {
        container.push(user[this.columnsToDisplay[col]])
      })
      return container;
    })
    this._dataExportationService.exportToPdf(this.userExportColumns, this.userExportRows, this.exportTitle);
  }

  //exports users to csv
  exportToCSV(): void {
    let entries = [];
    this.mandatoryColumns = this.mandatoryColumns;
    this._data.map(user => {

    })
  }

  //search
  search(): void {
    if (this.searchValue !== null){
        this.listOfDisplayData = this._data.filter((item: any) => item.firstName.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
        || item.lastName.indexOf(this.searchValue) !== -1);
      if (this.listOfDisplayData.length > 0)  {
        this._data = this.listOfDisplayData
      }
    } else if (this.searchValue == null) {
      this.ngOnInit()
    }
  }
  //navigates to single user view
  viewUser(element): void {
    this.router.navigate(['/users/view-user', element.id]);
  }

  //assigns a users a profile
  assignProfile(element): void {
    this.userDetails = element;
    this.updateUser = true;
    const dialogRef = this.dialog.open(AssignProfileComponent, {data: {data: this.userDetails, updateUser: this.updateUser}, height: '300px', width: '570px', disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      //this.loadData();
    })
  }

}
