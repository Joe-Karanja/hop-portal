import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteApprovalComponent } from './quote-approval.component';

describe('QuoteApprovalComponent', () => {
  let component: QuoteApprovalComponent;
  let fixture: ComponentFixture<QuoteApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
