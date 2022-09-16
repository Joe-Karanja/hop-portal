import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNotificationLenComponent } from './get-notification-len.component';

describe('GetNotificationLenComponent', () => {
  let component: GetNotificationLenComponent;
  let fixture: ComponentFixture<GetNotificationLenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetNotificationLenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetNotificationLenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
