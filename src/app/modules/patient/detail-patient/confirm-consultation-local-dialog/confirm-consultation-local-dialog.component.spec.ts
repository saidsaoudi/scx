import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmConsultationLocalDialogComponent } from './confirm-consultation-local-dialog.component';

describe('ConfirmConsultationLocalDialogComponent', () => {
  let component: ConfirmConsultationLocalDialogComponent;
  let fixture: ComponentFixture<ConfirmConsultationLocalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmConsultationLocalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmConsultationLocalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
