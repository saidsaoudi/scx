import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IriscopeComponent } from './iriscope.component';

describe('IriscopeComponent', () => {
  let component: IriscopeComponent;
  let fixture: ComponentFixture<IriscopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IriscopeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IriscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
