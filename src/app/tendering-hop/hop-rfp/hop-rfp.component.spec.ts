import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopRfpComponent } from './hop-rfp.component';

describe('HopRfpComponent', () => {
  let component: HopRfpComponent;
  let fixture: ComponentFixture<HopRfpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HopRfpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HopRfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
