import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-settings',
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.scss']
})
export class PaymentSettingsComponent implements OnInit {

  PODActive: boolean;
  POOActive: boolean;
  backgound = 'blue';

  constructor() { }

  ngOnInit(): void {
    this.PODActive = true
  }

  changeToPOO(event: any) {
    this.POOActive = true;
    this.PODActive = false;
  }

  changeToPOD(event: any) {
    this.PODActive = true;
    this.POOActive = false;
  }

}
