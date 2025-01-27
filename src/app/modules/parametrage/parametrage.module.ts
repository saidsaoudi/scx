import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrageRoutingModule } from './parametrage-routing.module';
import { TemplateComponent } from './templates/template/template.component';


@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    ParametrageRoutingModule
  ]
})
export class ParametrageModule { }
