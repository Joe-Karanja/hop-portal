import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopRfiComponent } from './hop-rfi.component';

describe('HopRfiComponent', () => {
  let component: HopRfiComponent;
  let fixture: ComponentFixture<HopRfiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HopRfiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HopRfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
