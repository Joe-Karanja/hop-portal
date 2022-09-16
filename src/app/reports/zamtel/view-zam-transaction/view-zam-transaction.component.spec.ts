import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewZamTransactionComponent } from './view-zam-transaction.component';

describe('ViewZamTransactionComponent', () => {
  let component: ViewZamTransactionComponent;
  let fixture: ComponentFixture<ViewZamTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewZamTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewZamTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
