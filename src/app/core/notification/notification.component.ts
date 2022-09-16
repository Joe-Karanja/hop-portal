import { Component, OnInit, Output, EventEmitter } from "@angular/core";

// import { interval, Subscription } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { HttpService } from '../../shared/http.service';

import { ApprovalDialogComponent } from '../../users/pending-approval/approval-dialog/approval-dialog.component';
import { ApprovalDetailsComponent } from '../../users/pending-approval/approval-details/approval-details.component';


@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html"
})
export class NotificationComponent implements OnInit {

 
  today: number = Date.now();
  len: number;
  pendingUsers: any[];
  public stagedArray: any[] = [];
  // notificationSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private _httpService: HttpService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    //this.getNotifications();
  }

  //retrieves staged items that require action
  getNotifications(): void {
    this._httpService.get('api/v1/workflow/get-user-pending-actions').subscribe(res => {
      if (res['status'] === 200) {
        this.len = res['data'].length;
        this.stagedArray = res['data'];
        // console.log("pending action: ", this.stagedArray);
      } else {
        this.toastr.error(res.message, 'Error!');
      }
    })
  }

  //triggers dialog that handles user approval
  approveUser(data: any): void {
    const dialogRef = this.dialog.open(ApprovalDialogComponent, {data: {stagingId: data.stagingId, stepId: data.stepId}, height: '400px', width: '400px', position: {right: '20px'}});
    dialogRef.afterClosed().subscribe(() => {
    })
  }
  
  //triggers dialog that handles details display
  viewDetails(data: any): void {
    const dialogRef = this.dialog.open(ApprovalDetailsComponent, {data: {action: data, stagingId: data.stagingId, stepId: data.stepId}, height: '490px', width: '1300px'});
    dialogRef.afterClosed().subscribe(() => {
      this.getNotifications();
    })
  }
}
