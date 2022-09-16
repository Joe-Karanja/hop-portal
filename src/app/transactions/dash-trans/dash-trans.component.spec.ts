import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTransComponent } from './dash-trans.component';

describe('DashTransComponent', () => {
  let component: DashTransComponent;
  let fixture: ComponentFixture<DashTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashTransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
