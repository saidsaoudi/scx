import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCollaborateurComponent } from './detail-collaborateur.component';

describe('DetailCollaborateurComponent', () => {
  let component: DetailCollaborateurComponent;
  let fixture: ComponentFixture<DetailCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCollaborateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
