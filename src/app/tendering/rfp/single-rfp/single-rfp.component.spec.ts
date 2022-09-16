import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRfpComponent } from './single-rfp.component';

describe('SingleRfpComponent', () => {
  let component: SingleRfpComponent;
  let fixture: ComponentFixture<SingleRfpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRfpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
