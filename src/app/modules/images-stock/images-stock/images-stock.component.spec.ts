import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesStockComponent } from './images-stock.component';

describe('ImagesStockComponent', () => {
  let component: ImagesStockComponent;
  let fixture: ComponentFixture<ImagesStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
