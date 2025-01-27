import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleconsultationComponent } from './teleconsultation.component';

describe('TeleconsultationComponent', () => {
  let component: TeleconsultationComponent;
  let fixture: ComponentFixture<TeleconsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeleconsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
