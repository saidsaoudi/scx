import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PepistageComponent } from './pepistage.component';

describe('PepistageComponent', () => {
  let component: PepistageComponent;
  let fixture: ComponentFixture<PepistageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PepistageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PepistageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
