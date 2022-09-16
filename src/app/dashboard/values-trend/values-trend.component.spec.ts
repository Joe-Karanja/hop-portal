import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesTrendComponent } from './values-trend.component';

describe('ValuesTrendComponent', () => {
  let component: ValuesTrendComponent;
  let fixture: ComponentFixture<ValuesTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuesTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuesTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
