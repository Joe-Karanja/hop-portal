import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedDashTransactionsComponent } from './failed-dash-transactions.component';

describe('FailedDashTransactionsComponent', () => {
  let component: FailedDashTransactionsComponent;
  let fixture: ComponentFixture<FailedDashTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedDashTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedDashTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
