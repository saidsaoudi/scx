import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Disponiblev2Component } from './disponiblev2.component';

describe('Disponiblev2Component', () => {
  let component: Disponiblev2Component;
  let fixture: ComponentFixture<Disponiblev2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Disponiblev2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Disponiblev2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
