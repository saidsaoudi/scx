import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificationApsComponent } from './planification-aps.component';

describe('PlanificationApsComponent', () => {
  let component: PlanificationApsComponent;
  let fixture: ComponentFixture<PlanificationApsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanificationApsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificationApsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
