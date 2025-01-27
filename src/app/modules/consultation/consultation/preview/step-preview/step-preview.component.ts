import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-preview',
  templateUrl: './step-preview.component.html',
  styleUrls: ['./step-preview.component.scss']
})
export class StepPreviewComponent implements OnInit {
  step = 1;
  constructor() { }

  ngOnInit(): void {
  }
  setStep($step : any) {
    // this.hideSteps($step);
    this.step = $step;
  }

  save(){
  }
}
