import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPersonnelsComponent } from './dialog-personnels.component';

describe('DialogPersonnelsComponent', () => {
  let component: DialogPersonnelsComponent;
  let fixture: ComponentFixture<DialogPersonnelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPersonnelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPersonnelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
