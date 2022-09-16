import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZiamisComponent } from './ziamis.component';

describe('ZiamisComponent', () => {
  let component: ZiamisComponent;
  let fixture: ComponentFixture<ZiamisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZiamisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZiamisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
