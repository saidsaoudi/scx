import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmeComponent } from './dialog-confirme.component';

describe('DialogConfirmeComponent', () => {
  let component: DialogConfirmeComponent;
  let fixture: ComponentFixture<DialogConfirmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
