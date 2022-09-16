import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsConfigsComponent } from './sms-configs.component';

describe('SmsConfigsComponent', () => {
  let component: SmsConfigsComponent;
  let fixture: ComponentFixture<SmsConfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsConfigsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
