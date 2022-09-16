import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfigsComponent } from './email-configs.component';

describe('EmailConfigsComponent', () => {
  let component: EmailConfigsComponent;
  let fixture: ComponentFixture<EmailConfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailConfigsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
