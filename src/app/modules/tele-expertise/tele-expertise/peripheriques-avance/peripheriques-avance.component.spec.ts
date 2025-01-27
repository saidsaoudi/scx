import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheriquesAvanceComponent } from './peripheriques-avance.component';

describe('PeripheriquesAvanceComponent', () => {
  let component: PeripheriquesAvanceComponent;
  let fixture: ComponentFixture<PeripheriquesAvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeripheriquesAvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeripheriquesAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
