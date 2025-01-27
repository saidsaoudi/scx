import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRendevousComponent } from './dialog-rendevous.component';

describe('DialogRendevousComponent', () => {
  let component: DialogRendevousComponent;
  let fixture: ComponentFixture<DialogRendevousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRendevousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRendevousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
