import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessFailedComponent } from './success-failed.component';

describe('SuccessFailedComponent', () => {
  let component: SuccessFailedComponent;
  let fixture: ComponentFixture<SuccessFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessFailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
