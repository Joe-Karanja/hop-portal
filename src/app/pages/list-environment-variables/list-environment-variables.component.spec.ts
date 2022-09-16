import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnvironmentVariablesComponent } from './list-environment-variables.component';

describe('ListEnvironmentVariablesComponent', () => {
  let component: ListEnvironmentVariablesComponent;
  let fixture: ComponentFixture<ListEnvironmentVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEnvironmentVariablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnvironmentVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
