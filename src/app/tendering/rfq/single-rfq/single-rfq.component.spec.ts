import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRfqComponent } from './single-rfq.component';

describe('SingleRfqComponent', () => {
  let component: SingleRfqComponent;
  let fixture: ComponentFixture<SingleRfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRfqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
