import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfiApplicationComponent } from './rfi-application.component';

describe('RfiApplicationComponent', () => {
  let component: RfiApplicationComponent;
  let fixture: ComponentFixture<RfiApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfiApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfiApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
