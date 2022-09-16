import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopRfqComponent } from './hop-rfq.component';

describe('HopRfqComponent', () => {
  let component: HopRfqComponent;
  let fixture: ComponentFixture<HopRfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HopRfqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HopRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
