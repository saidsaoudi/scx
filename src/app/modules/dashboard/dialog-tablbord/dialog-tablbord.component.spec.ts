import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTablbordComponent } from './dialog-tablbord.component';

describe('DialogTablbordComponent', () => {
  let component: DialogTablbordComponent;
  let fixture: ComponentFixture<DialogTablbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTablbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTablbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
