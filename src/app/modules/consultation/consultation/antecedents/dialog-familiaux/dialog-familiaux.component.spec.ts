import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFamiliauxComponent } from './dialog-familiaux.component';

describe('DialogFamiliauxComponent', () => {
  let component: DialogFamiliauxComponent;
  let fixture: ComponentFixture<DialogFamiliauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFamiliauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFamiliauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
