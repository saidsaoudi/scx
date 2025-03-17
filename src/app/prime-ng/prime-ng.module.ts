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
import { ChipModule } from 'primeng/chip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressBarModule } from 'primeng/progressbar';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { InputOtpModule } from 'primeng/inputotp';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


const MODULES = [
    ChartModule,
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
    ChipModule,
    PaginatorModule,
    RippleModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    SidebarModule,
    MenuModule,
    DividerModule,
    BadgeModule,
    AutoCompleteModule,
    ProgressBarModule,
    PanelModule,
    TabViewModule,
    InputOtpModule,
    TableModule,
    DialogModule,
    RadioButtonModule,
    FileUploadModule,
    ToastModule,
    CheckboxModule,
    ProgressSpinnerModule
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
