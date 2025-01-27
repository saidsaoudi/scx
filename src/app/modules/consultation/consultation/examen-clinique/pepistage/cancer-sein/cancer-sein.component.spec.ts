import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancerSeinComponent } from './cancer-sein.component';

describe('CancerSeinComponent', () => {
  let component: CancerSeinComponent;
  let fixture: ComponentFixture<CancerSeinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancerSeinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancerSeinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
