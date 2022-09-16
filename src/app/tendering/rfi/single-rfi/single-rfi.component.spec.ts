import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRfiComponent } from './single-rfi.component';

describe('SingleRfiComponent', () => {
  let component: SingleRfiComponent;
  let fixture: ComponentFixture<SingleRfiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRfiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
