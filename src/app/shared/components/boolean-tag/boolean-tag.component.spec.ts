import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanTagComponent } from './boolean-tag.component';

describe('BooleanTagComponent', () => {
  let component: BooleanTagComponent;
  let fixture: ComponentFixture<BooleanTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooleanTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
