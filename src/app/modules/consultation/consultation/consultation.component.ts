import { Component, OnInit, ViewChild } from '@angular/core';
import { VERSION } from '@angular/platform-browser-dynamic';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgStepperComponent } from 'angular-ng-stepper';
import { DialogService } from 'primeng/dynamicdialog';
import { Consultation } from 'src/app/core/models/consultation';
import { AppState } from 'src/app/core/store/app.states';
import { fetchOneConsultation } from 'src/app/core/store/consultation/consultation.action';
import { selectLoadingOneConsultation, selectOneConsultation } from 'src/app/core/store/consultation/consultation.selector';
import { DialogCloturerConsultationComponent } from './dialog-cloturer-consultation/dialog-cloturer-consultation.component';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
  providers: [DialogService]
})
export class ConsultationComponent implements OnInit {
  step = 1;
  hiddenSteps : any[] = [];
  name = 'Angular ' + VERSION.major;
  isLoading$ = this.store.select(selectLoadingOneConsultation)
  consultationId: any
  //@ts-ignore
  consultation: Consultation
  //@ts-ignore
  @ViewChild('cdkStepper') stepper: NgStepperComponent;
  constructor(
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  setStep($step : any) {
    // this.hideSteps($step);
    this.step = $step;
  }
  // hideSteps(step : any) {
  //   switch (step) {
  //     case 1:
  //       break;
  //     case 2:
  //       this.hiddenSteps = this.hiddenSteps.concat([1, 2]);
  //       break;
  //     case 3:
  //       this.hiddenSteps = this.hiddenSteps.concat([1, 2, 3]);
  //       break;
  //     case 4:
  //       break;
  //   }
  // }
  
  ngOnInit(): void {
    this.consultationId = this.route.snapshot.paramMap.get('id');
    this.fetchConsultation();
  }
  
  fetchConsultation(){
    this.store.dispatch(fetchOneConsultation({id: this.consultationId}));
    this.store.select(selectOneConsultation).subscribe(consultation  => {
       
      setTimeout(() => {
        if(this.stepper){
          this.selectCurrentStep(consultation.steps)
        }
      }, 0)
  
      //@ts-ignore
      this.consultation = consultation;
    })
  }

  selectCurrentStep(steps: any){

    steps.forEach((step: any, index: any) => {
      
        if(step == 1){
          for(let i = 0; i <= index + 1; i++){
            if(i < this.stepper.steps.length){
              this.stepper.selectedIndex = i;
            }
          }
        }
    });

  }

  cloturerConsultation() {
    const ref = this.dialogService.open(DialogCloturerConsultationComponent, {
      header: 'Êtes-vous sûr de vouloir clôturer la consultation ?',
      width: '50%',
      data: {}
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }

}
