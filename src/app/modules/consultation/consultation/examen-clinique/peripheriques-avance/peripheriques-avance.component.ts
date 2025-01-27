import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogEcgComponent } from './ecg/dialog-ecg/dialog-ecg.component';

@Component({
  selector: 'app-peripheriques-avance',
  templateUrl: './peripheriques-avance.component.html',
  styleUrls: ['./peripheriques-avance.component.scss'],
  providers: [DialogService]
})
export class PeripheriquesAvanceComponent implements OnInit {
  step = 1;
  stepdialog = 1;
  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }
  setStep($step : any) {
    this.step = $step;
  }
  setStepdialog($stepdialog : any){
    this.stepdialog = $stepdialog;
  }

  Openimage() {
    const ref = this.dialogService.open(DialogEcgComponent, {
      width: '60%',
      data: {}
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }
}
