import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFIComponent } from './rfi.component';

describe('RFIComponent', () => {
  let component: RFIComponent;
  let fixture: ComponentFixture<RFIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RFIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RFIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
