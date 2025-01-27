import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pepistage',
  templateUrl: './pepistage.component.html',
  styleUrls: ['./pepistage.component.scss']
})
export class PepistageComponent implements OnInit {
  step = 1;
  hiddenSteps : any[] = [];
  constructor() { }


  setStep($step : any) {
    // this.hideSteps($step);
    this.step = $step;
  }
  hideSteps(step : any) {
    switch (step) {
      case 1:
        break;
      case 2:
        this.hiddenSteps = this.hiddenSteps.concat([1, 2]);
        break;
      case 3:
        this.hiddenSteps = this.hiddenSteps.concat([1, 2, 3]);
        break;
      case 4:
        break;
    }
  }
  ngOnInit(): void {
  }

}
