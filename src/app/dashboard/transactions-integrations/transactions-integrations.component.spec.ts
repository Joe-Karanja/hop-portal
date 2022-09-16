import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsIntegrationsComponent } from './transactions-integrations.component';

describe('TransactionsIntegrationsComponent', () => {
  let component: TransactionsIntegrationsComponent;
  let fixture: ComponentFixture<TransactionsIntegrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsIntegrationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsIntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
