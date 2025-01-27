import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {TooltipModule} from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import {PaginatorModule} from 'primeng/paginator';
import {RippleModule} from 'primeng/ripple';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AccordionModule} from 'primeng/accordion';
import { SkeletonModule } from 'primeng/skeleton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { StepsModule } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ChipsModule } from 'primeng/chips';

const MODULES = [
    SkeletonModule,
    BreadcrumbModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    AvatarModule,
    AvatarGroupModule,
    TooltipModule,
    TagModule,
    OverlayPanelModule,
    AccordionModule,
    StepsModule,
    DropdownModule,
    CalendarModule,
    KeyFilterModule,
    ChipsModule,
    PaginatorModule,
    RippleModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class PrimeNGModule {}
