import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolPayComponent } from './school-pay.component';

describe('SchoolPayComponent', () => {
  let component: SchoolPayComponent;
  let fixture: ComponentFixture<SchoolPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
