import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEcgComponent } from './dialog-ecg.component';

describe('DialogEcgComponent', () => {
  let component: DialogEcgComponent;
  let fixture: ComponentFixture<DialogEcgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEcgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEcgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
