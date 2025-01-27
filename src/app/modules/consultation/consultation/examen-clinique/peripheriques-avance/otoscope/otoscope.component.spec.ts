import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtoscopeComponent } from './otoscope.component';

describe('OtoscopeComponent', () => {
  let component: OtoscopeComponent;
  let fixture: ComponentFixture<OtoscopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtoscopeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtoscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
