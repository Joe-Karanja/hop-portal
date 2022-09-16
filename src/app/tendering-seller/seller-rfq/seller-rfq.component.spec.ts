import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerRfqComponent } from './seller-rfq.component';

describe('SellerRfqComponent', () => {
  let component: SellerRfqComponent;
  let fixture: ComponentFixture<SellerRfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerRfqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
