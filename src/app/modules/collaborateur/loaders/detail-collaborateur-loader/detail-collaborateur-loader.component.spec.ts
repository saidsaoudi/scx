import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCollaborateurLoaderComponent } from './detail-collaborateur-loader.component';

describe('DetailCollaborateurLoaderComponent', () => {
  let component: DetailCollaborateurLoaderComponent;
  let fixture: ComponentFixture<DetailCollaborateurLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCollaborateurLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCollaborateurLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
