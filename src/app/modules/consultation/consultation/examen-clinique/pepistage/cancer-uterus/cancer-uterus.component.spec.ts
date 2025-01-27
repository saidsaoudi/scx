import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancerUterusComponent } from './cancer-uterus.component';

describe('CancerUterusComponent', () => {
  let component: CancerUterusComponent;
  let fixture: ComponentFixture<CancerUterusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancerUterusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancerUterusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
