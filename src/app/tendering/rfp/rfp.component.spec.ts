import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFPComponent } from './rfp.component';

describe('RFPComponent', () => {
  let component: RFPComponent;
  let fixture: ComponentFixture<RFPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RFPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RFPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
