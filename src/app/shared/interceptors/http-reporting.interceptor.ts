import { Injectable } from '@angular/core';
import {
  HttpErrorResponse, 
  HttpEvent, 
  HttpHandler, 
  HttpInterceptor, 
  HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../auth/auth.service';

@Injectable()
export class HttpReportingInterceptor implements HttpInterceptor {

  static readonly REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string = 'Please refresh the page';
  static readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';
  public permissionsMessage = "You don't permission to view this data. Please reach out to your Admin";

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
        .pipe(
            retry(1),
            catchError((err: HttpErrorResponse) => {
                const httpErrorCode = err.status;
                switch (httpErrorCode) {
                    case 401:
                        this.authService.logout();
                        location.reload();
                        break;
                    case 403:
                        this.showError(this.permissionsMessage)
                        break;
                    case 400:
                        this.showError(err.message);
                        break;
                    default:
                        this.showError(HttpReportingInterceptor.REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE);
                }
                return throwError(err.message);
            })
        );
  }
  private showError(message: string): void {
    this.toastr.error(message, HttpReportingInterceptor.DEFAULT_ERROR_TITLE)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }
}
