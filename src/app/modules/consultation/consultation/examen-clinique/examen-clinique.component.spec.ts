import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenCliniqueComponent } from './examen-clinique.component';

describe('ExamenCliniqueComponent', () => {
  let component: ExamenCliniqueComponent;
  let fixture: ComponentFixture<ExamenCliniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenCliniqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenCliniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
