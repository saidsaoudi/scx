import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCloturerConsultationComponent } from './dialog-cloturer-consultation.component';

describe('DialogCloturerConsultationComponent', () => {
  let component: DialogCloturerConsultationComponent;
  let fixture: ComponentFixture<DialogCloturerConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCloturerConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCloturerConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
