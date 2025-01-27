import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRendezVousComponent } from './dialog-rendez-vous.component';

describe('DialogRendezVousComponent', () => {
  let component: DialogRendezVousComponent;
  let fixture: ComponentFixture<DialogRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRendezVousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
