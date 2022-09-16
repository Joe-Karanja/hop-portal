import { TestBed } from '@angular/core/testing';

import { HttpReportingInterceptor } from './http-reporting.interceptor';

describe('HttpReportingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpReportingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpReportingInterceptor = TestBed.inject(HttpReportingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
