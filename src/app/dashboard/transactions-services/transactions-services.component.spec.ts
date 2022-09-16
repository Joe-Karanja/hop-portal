import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsServicesComponent } from './transactions-services.component';

describe('TransactionsServicesComponent', () => {
  let component: TransactionsServicesComponent;
  let fixture: ComponentFixture<TransactionsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
