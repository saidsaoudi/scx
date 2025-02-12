import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesStockComponent } from './images-stock/images-stock.component';

const routes: Routes = [
    {path: '', component: ImagesStockComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesStockRoutingModule { }
