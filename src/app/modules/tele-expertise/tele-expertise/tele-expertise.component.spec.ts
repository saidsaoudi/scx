import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleExpertiseComponent } from './tele-expertise.component';

describe('TeleExpertiseComponent', () => {
  let component: TeleExpertiseComponent;
  let fixture: ComponentFixture<TeleExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeleExpertiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
