import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPreviewComponent } from './step-preview.component';

describe('StepPreviewComponent', () => {
  let component: StepPreviewComponent;
  let fixture: ComponentFixture<StepPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
