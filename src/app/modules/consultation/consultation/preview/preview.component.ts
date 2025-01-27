import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { StepPreviewComponent } from './step-preview/step-preview.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  providers: [DialogService]
})
export class PreviewComponent implements OnInit {
  isActive = 1;
  step = 1;
  stepdialog = 1;

  next() {
    if (this.isActive == 3) this.isActive = 0;
    this.isActive ++;
  }
  pre() {
    this.isActive --;
    if (this.isActive == 0) this.isActive = 3;
  }
  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  setStep($step : any) {
    this.step = $step;
  }
  setStepdialog($stepdialog : any){
    this.stepdialog = $stepdialog;
  }

  StepPreview() {
    const ref = this.dialogService.open(StepPreviewComponent, {
      width: '50%',
      data: {}
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }

}
