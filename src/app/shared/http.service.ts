import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GlobalService } from './global.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  errorMessage: string;
  len: number;
  pendingUsers: any[];
  stagedArray: any[] = [];

  constructor(
    private _authService: AuthService,
    private _globalService: GlobalService,
    private httpClient: HttpClient
  ) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this._authService.token,
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'no-sniff',
      'X-Frame-Options': 'deny',
      "Access-Control-Allow-Origin": "*",
    });
  }

  private getFormHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this._authService.token,
      //'Content-Type': 'multipart/form-data',
    });
  }
  
  private getHeadersWithoutBearer(): HttpHeaders {
    return new HttpHeaders({
        'Content-Type': 'application/json'
    });
  }

  //returns error message
  loadErrorMessage(): string {
    this.errorMessage = 'This action is forbidden, your current profile lacks the relevant role';
    return this.errorMessage;
  }

  public post(endpoint: string, model: any): any {
    return this.httpClient.post(this._globalService.universalEndpoint + endpoint, model, { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public postRB(endpoint: string, model: any): any {
    return this.httpClient.post('http://10.20.2.159:8993/' + endpoint, model, { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }
  public postAudit(endpoint: string, model: any): any {
    return this.httpClient.post('http://10.20.2.159:8993/' + endpoint, model, { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public postBT(endpoint: string, model: any): any {
    return this.httpClient.post('http://10.20.2.159:8093/' + endpoint, JSON.stringify(model), { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public postBTForm(endpoint: string, model: any): any {
    let formData: any = new FormData();
    formData.append('businessId', model.businessId);
    formData.append('document', model.document)
    return this.httpClient.post('http://10.20.2.159:8093/' + endpoint, formData, { headers: this.getFormHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public postBTCerts(endpoint: string, model: any): any {
    let formData: any = new FormData();
    formData.append('businessId', model.businessId);
    formData.append('idDocuments', model.idDocuments);
    formData.append('kraPin', model.kraPin);
    return this.httpClient.post('http://10.20.2.159:8093/' + endpoint, formData, { headers: this.getFormHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public postAns(endpoint: string, model: any, attachment: any): any {
    let formData: any = new FormData();
    formData.append('answers', model);
    if (attachment != null) {
      formData.append('attachments', attachment);
    }
    return this.httpClient.post('http://10.20.2.159:8093/' + endpoint, formData, { headers: this.getFormHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public postOnboard(endpoint: string, user: any): any {
    let formData: any = new FormData();
    formData.append('userDetails', JSON.stringify(user.userDetails));
    formData.append('businessDetails', JSON.stringify(user.businessDetails));
    formData.append('vatForm', user.vatForm);
    formData.append('businessForm', user.businessForm);
    formData.append('kraForm', user.kraForm);
    
    console.log(JSON.stringify(user))
    return this.httpClient.post<any>(`http://10.20.2.159:8093/${endpoint}`, formData);
  }

  public postForm(endpoint: string, data: any): any {
    const formData: any = new FormData();
    formData.append('rfi', JSON.stringify(data.rfi));
    formData.append('attachments', data.attachments);
    
    console.log(JSON.stringify(data))
    return this.httpClient.post<any>(`http://10.20.2.159:7897/${endpoint}`, formData, {
      headers: this.getFormHeaders()
    });
  }

  public postProducts(endpoint: string, product: any) {
    let formData: any = new FormData();
    for (let i = 0; i < product.product_images.length; i++) { 
      formData.append('productImages', product.product_images[i]);
    }
    formData.append('product', JSON.stringify(product.product));
    
    console.log(JSON.stringify(product))
    return this.httpClient.post<any>(`http://10.20.2.159:7897/${endpoint}`, formData, {headers: this.getFormHeaders()});
  }

  public getProducts(endpoint: string, model: any) {
    return this.httpClient.post(`http://10.20.2.159:7897/${endpoint}`, model,{ headers: this.getHeaders() }
      ).pipe(map(response => {
        //console.log(response)
        response = response;
        return response;
    }));
  }

  public getP(endpoint: string) {
    return this.httpClient.get(`http://10.20.2.159:7897/${endpoint}`,{ headers: this.getHeaders()}
      ).pipe(map(response => {
        console.log(response)
        response = response;
        return response;
    }));
  }

  public postP(endpoint: string, model: any) {
    return this.httpClient.post(`http://10.20.2.159:7897/${endpoint}`, model,{ headers: this.getHeaders()}
      ).pipe(map(response => {
        response = response;
        return response;
    }));
  }

  // public postDb(model: any): any {
  //   return this.httpClient.post(this._globalService.dbAPIEndpoint, model, { headers: this.getHeaders() }
  //   ).pipe(map(response => {
  //     // console.log(response)
  //       response = response;
  //       return response;
  //   }));
  // }

  public postStored(model: any): any {
    return this.httpClient.post(this._globalService.storedEndpoint, model, {headers: this.getHeaders()}).
    pipe(map(response => {
      response = response;
      return response;
    }))
  }

  public postVariables(endpoint: string, model: any): any {
    return this.httpClient.post(this._globalService.managerEndpoint + endpoint, model, { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public get(endpoint: string): any {
    return this.httpClient.get(this._globalService.universalEndpoint + endpoint, { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public getBT(endpoint: string): any {
    return this.httpClient.get('http://10.20.2.159:8093/' + endpoint, { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public getUnAuth(endpoint: string): any {
    return this.httpClient.get('http://10.20.2.159:8093/' + endpoint 
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public getData(endpoint: string, model: any, body: any): any {
    const params = new HttpParams()
      .set('page', model.page.toString())
      .set('size', model.size.toString())
    return this.httpClient.post(this._globalService.auditEndpoint + endpoint, body, { params, headers: this.getHeaders() }).pipe(map(response => {
      response = response;
      return response;
    }))
  }

  public getAudit(endpoint: string): any {
    return this.httpClient.get("http://10.20.2.159:9793/" + endpoint, { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public retrieveData(endPoint: string, model: any): any {
    const params = new HttpParams()
      .set('page', model.page.toString())
      .set('size', model.size.toString())
    return this.httpClient.get('http://10.20.2.159:8993/' + endPoint, { params, headers: this.getHeaders() }).pipe(map(response => {
      response = response;
      return response;
    }))
  }

  public retrieveRB(endPoint: string): any {
    return this.httpClient.get('http://10.20.2.159:8993/' + endPoint, {  headers: this.getHeaders() }).pipe(map(response => {
      response = response;
      return response;
    }))
  }

  // public loadNotifications(): void {
  //   this.get('api/v1/workflow/get-user-pending-actions').subscribe(res => {
  //     if (res['status'] === 200) {
  //       this.len = res['data'].length;
  //       this.pendingUsers = res['data'];
  //       let userContainer;
  //       this.pendingUsers.map(item => {
  //         userContainer = JSON.parse(JSON.parse(item['data']));
  //         userContainer['id'] = item['id'];
  //         userContainer['createdBy'] = item['createdBy'];
  //         userContainer['createdOn'] = item['createdOn'];
  //         userContainer['workflowName'] = item['workflowName'];
  //         this.stagedArray.push(userContainer);
  //       });
  //       console.log('user details: ', this.stagedArray);
  //     }
  //   })
  // }

  // public retrieveChannels(): any {
  //   let model = {
  //     query: "GET_CHANNELS_QUERY",
  //     data: {}
  //   };
  //   this.postDb(model)
  // }
}
