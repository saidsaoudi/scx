import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatoscopeComponent } from './dermatoscope.component';

describe('DermatoscopeComponent', () => {
  let component: DermatoscopeComponent;
  let fixture: ComponentFixture<DermatoscopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatoscopeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatoscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
