import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderingSettingsComponent } from './tendering-settings.component';

describe('TenderingSettingsComponent', () => {
  let component: TenderingSettingsComponent;
  let fixture: ComponentFixture<TenderingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderingSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
