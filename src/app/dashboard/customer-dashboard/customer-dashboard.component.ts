import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {

  availableServices: string[] = ['Agent Account Balance', 'Loan Request', 'Ministatement'];
  chartColors: Array<any> = [
    {
      backgroundColor: "#14314f",
      borderColor: "#14314f",
      pointBackgroundColor: "#14314f",
      pointBorderColor: "#14314f",
      pointHoverBackgroundColor: "#14314f",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      backgroundColor: "#868484",
      borderColor: "#868484",
      pointBackgroundColor: "#868484",
      pointBorderColor: "#868484",
      pointHoverBackgroundColor: "#868484",
      pointHoverBorderColor: "rgba(77,83,96,1)"
    },
    {
      backgroundColor: "#d91A1A",
      borderColor: "#d91A1A",
      pointBackgroundColor: "#d91A1A",
      pointBorderColor: "#d91A1A",
      pointHoverBackgroundColor: "#d91A1A",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    },
    {
      backgroundColor: "#387CA6",
      borderColor: "#387CA6",
      pointBackgroundColor: "#387CA6",
      pointBorderColor: "#387CA6",
      pointHoverBackgroundColor: "#387CA6",
      pointHoverBorderColor: "rgba(148,159,177,0.8)"
    }
  ];
  DAILYREGISTRATIONS = {
    "success": true,
    "message": "customer registration retrieved successfully",
    "data": {
        "successfulRegistrations": [{
            "registeredOn": "2021-08-12",
            "count": 6000,
        },
        {
            "registeredOn": "2021-08-13",
            "count": 5800
        },
        {
            "registeredOn": "2021-08-14",
            "count": 6200
        },
        {
            "registeredOn": "2021-08-15",
            "count": 6320
        },
        {
            "registeredOn": "2021-08-16",
            "count": 6517
        },
        {
            "registeredOn": "2021-08-17",
            "count": 7517
        },
        {
            "registeredOn": "2021-08-18",
            "count": 6580
        }],
        "unsuccessfulRegistrations": [{
          "registeredOn": "2021-08-12",
          "count": 600
      },
      {
          "registeredOn": "2021-08-13",
          "count": 580
      },
      {
          "registeredOn": "2021-08-14",
          "count": 620
      },
      {
          "registeredOn": "2021-08-15",
          "count": 632
      },
      {
          "registeredOn": "2021-08-16",
          "count": 651
      },
      {
          "registeredOn": "2021-08-17",
          "count": 751
      },
      {
          "registeredOn": "2021-08-18",
          "count": 658
      }]
    }
  }
  MONTHLYREGISTRATIONS = {
    "success": true,
    "message": "customer registration retrieved successfully",
    "data": {
        "successfulRegistrations": [{
            "registeredOn": "Jan-2021",
            "count": 36000,
        },
        {
            "registeredOn": "Feb-2021",
            "count": 35800
        },
        {
            "registeredOn": "Mar-2021",
            "count": 36200
        },
        {
            "registeredOn": "Apr-2021",
            "count": 36320
        },
        {
            "registeredOn": "May-2021",
            "count": 36517
        },
        {
            "registeredOn": "Jun-2021",
            "count": 37517
        },
        {
            "registeredOn": "Jul-2021",
            "count": 36580
        }],
        "unsuccessfulRegistrations": [{
          "registeredOn": "Jan-2021",
          "count": 3600
      },
      {
          "registeredOn": "Feb-2021",
          "count": 3580
      },
      {
          "registeredOn": "Mar-2021",
          "count": 3620
      },
      {
          "registeredOn": "Apr-2021",
          "count": 3632
      },
      {
          "registeredOn": "May-2021",
          "count": 3651
      },
      {
          "registeredOn": "Jun-2021",
          "count": 3751
      },
      {
          "registeredOn": "Jul-2021",
          "count": 3658
      }]
    }
  }
  globalChartOptions: any = {
    responsive: true,
    legend: {
      display: true,
      position: "top"
    }
  };
  lineChartData: any[];
  lineChartLabels: string[];
  lineChartLegend: boolean;
  lineChartType = "line";
  lineChartOptions: any = Object.assign(
    {
      animation: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "rgba(0,0,0,0.02)",
              zeroLineColor: "rgba(0,0,0,0.02)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              color: "rgba(0,0,0,0.02)",
              zeroLineColor: "rgba(0,0,0,0.02)"
            },
            ticks: {
              beginAtZero: true,
              suggestedMax: 9
            }
          }
        ]
      }
    },
    this.globalChartOptions
  );
  barChartData: any[];
  barChartLabels: string[];
  barChartLegend: boolean;
  barChartType = "bar";
  period: string = 'Daily';
  pieChartData: any[];
  pieChartLabels: string[];
  pieChartLegend: boolean;
  pieChartType = "pie";
  pieChartOptions: any = Object.assign(
    this.globalChartOptions
  );
  pieChartColors: string[] = ["#14314f", "#d51317", "#868484"];
  report;
  reportTypes: string[] = ['Hourly', 'Daily', 'Monthly'];
  selectedDate;

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getRegistrationTrend();
    this.getRegistrationChannels();
  }

  //filters report types
  getReport(event): void {
    this.period = event;
    this.toastr.success(`${this.period} registrations retrieved`, 'Success!')
    this.getRegistrationTrend();
    this.getRegistrationChannels();
  }
  onChange(event): void {
    
  }

  //exports registration data in xlsx
  exportData(): void {
    let rentries = [];
    let successfulRegs = [];
    let unsuccessfulRegs = [];
    this.DAILYREGISTRATIONS['data']['successfulRegistrations'].map(it => {
      it['success'] = 'true';
      successfulRegs.push(it);
    });
    this.DAILYREGISTRATIONS['data']['unsuccessfulRegistrations'].map(it => {
      it['success'] = 'false';
      unsuccessfulRegs.push(it);
    });
    let data = successfulRegs.concat(unsuccessfulRegs);
    data.map(it => {
      let container = {};
      container['Registration Date'] = it['registeredOn'];
      container['Registered Customers'] = it['count'];
      container['Registration Success Status'] = it['success'].toUpperCase();
      rentries.push(container);
    })
    let doc = rentries;
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(doc);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Customer-Registration');
    XLSX.writeFile(wb, 'customer-registration.xlsx');
  }

  //charts customer registration by channel
  getRegistrationChannels(): void {
    if(this.period == 'Daily') {
      this.pieChartLegend = true;
      this.pieChartLabels = ['Agents', 'Online', 'Teller', 'Mobile'];
      this.pieChartData = [12463, 13548, 15289, 12003];
    } else if(this.period == 'Monthly') {
      this.pieChartLegend = true;
      this.pieChartLabels = ['Agents', 'Online', 'Teller', 'Mobile'];
      this.pieChartData = [312463, 313548, 315289, 312003];
    }
  }

  //filters data based on selected date range
  datedData(dateStart: HTMLInputElement, dateEnd: HTMLInputElement): void {
  }

  //charts customer registration over time
  getRegistrationTrend(): void {
    if (this.period == 'Daily') {
      let data = this.DAILYREGISTRATIONS['data']['successfulRegistrations'];
      let data2 = this.DAILYREGISTRATIONS['data']['unsuccessfulRegistrations'];
      this.lineChartLabels = [];
      data.map(item => {
        this.lineChartLabels.push(item['registeredOn'])
      });
      let successfulData = [];
      data.map(item => {
        successfulData.push(item['count'])
      });
      let unsuccessfulData = [];
      data2.map(item => {
        unsuccessfulData.push(item['count'])
      })
      this.lineChartLegend = true;
      this.lineChartData = [
        {
          data: successfulData,
          label: "Successful Registrations",
          borderWidth: 1,
          type: "line",
          fill: false,
          tension: 0.1
        },
        {
          data: unsuccessfulData,
          label: "Unsuccessful Registrations",
          borderWidth: 1,
          type: "line",
          fill: false,
          tension: 0.1
        }
      ];
    } else if (this.period == 'Monthly') {
      let data = this.MONTHLYREGISTRATIONS['data']['successfulRegistrations'];
      let data2 = this.MONTHLYREGISTRATIONS['data']['unsuccessfulRegistrations'];
      this.lineChartLabels = [];
      data.map(item => {
        this.lineChartLabels.push(item['registeredOn'])
      });
      let successfulData = [];
      data.map(item => {
        successfulData.push(item['count'])
      });
      let unsuccessfulData = [];
      data2.map(item => {
        unsuccessfulData.push(item['count'])
      })
      this.lineChartLegend = true;
      this.lineChartData = [
        {
          data: successfulData,
          label: "Successful Registrations",
          borderWidth: 1,
          type: "line",
          fill: false,
          tension: 0.1
        },
        {
          data: unsuccessfulData,
          label: "Unsuccessful Registrations",
          borderWidth: 1,
          type: "line",
          fill: false,
          tension: 0.1
        }
      ];
    }
    
  }
}
