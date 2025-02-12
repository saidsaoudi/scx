import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from 'src/app/prime-ng/prime-ng.module';
import { ImagesStockRoutingModule } from './images-stock-routing.module';
import { ImagesStockComponent } from './images-stock/images-stock.component';


@NgModule({
  declarations: [ImagesStockComponent],
  imports: [
    CommonModule,
    ImagesStockRoutingModule,
    PrimeNGModule
    
  ]
})
export class ImagesStockModule { }
