import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { interval, Subscription } from 'rxjs';

import { HttpService } from "../../shared/http.service";

@Component({
  selector: 'app-get-notification-len',
  templateUrl: './get-notification-len.component.html',
  styleUrls: ['./get-notification-len.component.scss']
})
export class GetNotificationLenComponent implements OnInit {

  @Output() getStagedLength = new EventEmitter<number>();
  len: number = 0;
  notificationSubscription: Subscription;

  constructor(
    private _httpService: HttpService
  ) { 
    // this.notificationSubscription = interval(10000).subscribe(() => {
    //   this.getNotificationsLength();
    // })

  }

  ngOnInit(): void {
    //this.getNotificationsLength();
  }

  getNotificationsLength() {
    this._httpService.get('api/v1/workflow/get-user-pending-actions').subscribe(res => {
      if (res['status'] === 200) {
        this.len = res['data'].length;
        this.getStagedLength.emit(this.len);
      }
    })
  }

}
