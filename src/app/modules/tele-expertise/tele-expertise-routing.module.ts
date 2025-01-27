import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeleExpertiseComponent } from './tele-expertise/tele-expertise.component';

const routes: Routes = [
  {path: '', component : TeleExpertiseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeleExpertiseRoutingModule { }
