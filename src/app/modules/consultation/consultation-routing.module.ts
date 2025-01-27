import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationComponent } from './consultation/consultation.component';
import { PreviewComponent } from './consultation/preview/preview.component';

const routes: Routes = [
  {path: '', component : ConsultationComponent},
  {path: 'consultation/preview', component : PreviewComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationRoutingModule { }
