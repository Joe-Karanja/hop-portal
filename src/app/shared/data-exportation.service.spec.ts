import { TestBed } from '@angular/core/testing';

import { DataExportationService } from './data-exportation.service';

describe('DataExportationService', () => {
  let service: DataExportationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataExportationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
