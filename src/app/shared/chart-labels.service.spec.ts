import { TestBed } from '@angular/core/testing';

import { ChartLabelsService } from './chart-labels.service';

describe('ChartLabelsService', () => {
  let service: ChartLabelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartLabelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
