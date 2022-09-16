import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubTypeComponent } from './add-sub-type.component';

describe('AddSubTypeComponent', () => {
  let component: AddSubTypeComponent;
  let fixture: ComponentFixture<AddSubTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
