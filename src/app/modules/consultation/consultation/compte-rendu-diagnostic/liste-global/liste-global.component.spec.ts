import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeGlobalComponent } from './liste-global.component';

describe('ListeGlobalComponent', () => {
  let component: ListeGlobalComponent;
  let fixture: ComponentFixture<ListeGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
