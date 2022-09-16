import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardTenderComponent } from './award-tender.component';

describe('AwardTenderComponent', () => {
  let component: AwardTenderComponent;
  let fixture: ComponentFixture<AwardTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardTenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
