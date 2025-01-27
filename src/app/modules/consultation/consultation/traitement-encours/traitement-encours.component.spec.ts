import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementEncoursComponent } from './traitement-encours.component';

describe('TraitementEncoursComponent', () => {
  let component: TraitementEncoursComponent;
  let fixture: ComponentFixture<TraitementEncoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitementEncoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementEncoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
