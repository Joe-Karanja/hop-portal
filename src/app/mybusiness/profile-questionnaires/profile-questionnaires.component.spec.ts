import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileQuestionnairesComponent } from './profile-questionnaires.component';

describe('ProfileQuestionnairesComponent', () => {
  let component: ProfileQuestionnairesComponent;
  let fixture: ComponentFixture<ProfileQuestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileQuestionnairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
