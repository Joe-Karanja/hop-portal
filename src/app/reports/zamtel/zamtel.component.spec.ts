import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZamtelComponent } from './zamtel.component';

describe('ZamtelComponent', () => {
  let component: ZamtelComponent;
  let fixture: ComponentFixture<ZamtelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZamtelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZamtelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
