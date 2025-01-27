import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteRenduDiagnosticComponent } from './compte-rendu-diagnostic.component';

describe('CompteRenduDiagnosticComponent', () => {
  let component: CompteRenduDiagnosticComponent;
  let fixture: ComponentFixture<CompteRenduDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteRenduDiagnosticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteRenduDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
