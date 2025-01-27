import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheriquesBaseComponent } from './peripheriques-base.component';

describe('PeripheriquesBaseComponent', () => {
  let component: PeripheriquesBaseComponent;
  let fixture: ComponentFixture<PeripheriquesBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeripheriquesBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeripheriquesBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
