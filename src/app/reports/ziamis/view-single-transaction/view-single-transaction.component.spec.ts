import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleTransactionComponent } from './view-single-transaction.component';

describe('ViewSingleTransactionComponent', () => {
  let component: ViewSingleTransactionComponent;
  let fixture: ComponentFixture<ViewSingleTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSingleTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
