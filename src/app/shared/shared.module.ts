import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ContentSidebarComponent } from './layout/sidebar/content-sidebar/content-sidebar.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { BooleanTagComponent } from './components/boolean-tag/boolean-tag.component';
import { TagComponent } from './components/tag/tag.component';
import { StarComponent } from './components/star/star.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { ImageWithPreviewComponent } from './components/image-with-preview/image-with-preview.component';
import { CustomDateFormatPipe } from './pipes/custom-date-format.pipe';
import { AgePipe } from './pipes/age.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { DatePickerAvailabilityDirective } from './directives/date-picker-availability.directive';
import { MultiSelectionDirective } from './directives/multi-selection.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ContentSidebarComponent,
    BooleanTagComponent,
    TagComponent,
    StarComponent,
    GoBackComponent,
    ImageWithPreviewComponent,
    CustomDateFormatPipe,
    AgePipe,
    TruncateTextPipe,
    DatePickerAvailabilityDirective,
    MultiSelectionDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimeNGModule,
    
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BooleanTagComponent,
    TagComponent,
    StarComponent,
    GoBackComponent,
    ImageWithPreviewComponent,
    AgePipe,
    TruncateTextPipe,
    DatePickerAvailabilityDirective,
    MultiSelectionDirective
    
  ]
})
export class SharedModule { }
