import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSchoolPayComponent } from './single-school-pay.component';

describe('SingleSchoolPayComponent', () => {
  let component: SingleSchoolPayComponent;
  let fixture: ComponentFixture<SingleSchoolPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSchoolPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSchoolPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
