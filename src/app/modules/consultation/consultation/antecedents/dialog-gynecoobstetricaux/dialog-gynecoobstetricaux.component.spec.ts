import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGynecoobstetricauxComponent } from './dialog-gynecoobstetricaux.component';

describe('DialogGynecoobstetricauxComponent', () => {
  let component: DialogGynecoobstetricauxComponent;
  let fixture: ComponentFixture<DialogGynecoobstetricauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGynecoobstetricauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGynecoobstetricauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
