import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHabitudesToxiquesComponent } from './dialog-habitudes-toxiques.component';

describe('DialogHabitudesToxiquesComponent', () => {
  let component: DialogHabitudesToxiquesComponent;
  let fixture: ComponentFixture<DialogHabitudesToxiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHabitudesToxiquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHabitudesToxiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
