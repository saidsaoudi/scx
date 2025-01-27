import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotifConsultationComponent } from './motif-consultation.component';

describe('MotifConsultationComponent', () => {
  let component: MotifConsultationComponent;
  let fixture: ComponentFixture<MotifConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotifConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotifConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
