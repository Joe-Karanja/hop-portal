import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerRfiComponent } from './seller-rfi.component';

describe('SellerRfiComponent', () => {
  let component: SellerRfiComponent;
  let fixture: ComponentFixture<SellerRfiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerRfiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerRfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
