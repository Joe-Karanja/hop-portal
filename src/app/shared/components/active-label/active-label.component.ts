import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-active-label',
  templateUrl: './active-label.component.html',
  styleUrls: ['./active-label.component.scss']
})
export class ActiveLabelComponent implements OnInit {

  label: any;
  labelClass: any;
  @Input() labelValue: any;

  constructor() { }

  ngOnInit(): void {
    if(this.labelValue == true){
      this.label = "Active";
      this.labelClass = 'green';
    } 
    if (this.labelValue == false) {
      this.label = "Inactive";
      this.labelClass = 'magenta';
    }
  }

}
