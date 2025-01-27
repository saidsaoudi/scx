import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCollaborateurLoaderComponent } from './liste-collaborateur-loader.component';

describe('ListeCollaborateurLoaderComponent', () => {
  let component: ListeCollaborateurLoaderComponent;
  let fixture: ComponentFixture<ListeCollaborateurLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCollaborateurLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCollaborateurLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
