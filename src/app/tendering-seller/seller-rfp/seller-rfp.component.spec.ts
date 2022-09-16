import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerRfpComponent } from './seller-rfp.component';

describe('SellerRfpComponent', () => {
  let component: SellerRfpComponent;
  let fixture: ComponentFixture<SellerRfpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerRfpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerRfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
