import { Component, OnInit } from '@angular/core';
import { DataExportationService } from 'src/app/shared/data-exportation.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  idBusiness: string;
  loading: boolean ;

  //docs
  docBase64: any
  isVisible = false;

  constructor(
    private _dataExportationService: DataExportationService
  ) {}

  ngOnInit(): void {
    this.idBusiness = localStorage.getItem('businessId')
  }

  open(base64:any) {
    this.docBase64 = base64
    this.isVisible = true;
    
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  
}
