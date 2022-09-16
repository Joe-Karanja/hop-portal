import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopPurchaseOrdersComponent } from './hop-purchase-orders.component';

describe('HopPurchaseOrdersComponent', () => {
  let component: HopPurchaseOrdersComponent;
  let fixture: ComponentFixture<HopPurchaseOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HopPurchaseOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HopPurchaseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
