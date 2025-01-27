import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAllergiquesComponent } from './dialog-allergiques.component';

describe('DialogAllergiquesComponent', () => {
  let component: DialogAllergiquesComponent;
  let fixture: ComponentFixture<DialogAllergiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAllergiquesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAllergiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
