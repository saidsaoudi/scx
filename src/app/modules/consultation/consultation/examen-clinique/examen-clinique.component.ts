import { Component, OnInit,EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Consultation } from 'src/app/core/models/consultation';
import { AppState } from 'src/app/core/store/app.states';
import { updateConsultation } from 'src/app/core/store/consultation/consultation.action';
import { selectStatusConsultations } from 'src/app/core/store/consultation/consultation.selector';
import { localStorageHelper } from 'src/app/helpers/localStorage.helper';
import { PeripheriquesBaseComponent } from 'src/app/modules/tele-expertise/tele-expertise/peripheriques-base/peripheriques-base.component';

@Component({
  selector: 'app-examen-clinique',
  templateUrl: './examen-clinique.component.html',
  styleUrls: ['./examen-clinique.component.scss']
})
export class ExamenCliniqueComponent implements OnInit {
  @Output() stepEmitter = new EventEmitter<any>();
  checked: boolean = false;
  //@ts-ignore
  @Input() consultation: Consultation
  @ViewChild('child') peripheriqueBase!: PeripheriquesBaseComponent;
  constructor(private store: Store<AppState>,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  save(){
    let payload = {
      vitalSigns: {
          weight: this.peripheriqueBase.poids,
          height: this.peripheriqueBase.taille,
          temperature: this.peripheriqueBase.temperature,
          sys: this.peripheriqueBase.systolique,
          dia: this.peripheriqueBase.diastolique,
          pulse: this.peripheriqueBase.rythmeCardiaque,
          spo2: this.peripheriqueBase.saturation,
          bloodSugar: this.peripheriqueBase.glycemie,
          respiratoryRythm: this.peripheriqueBase.frequenceResp,
          fatMass: 0,
          leanMass: 0,
          patientId: this.consultation.patientId,
          doctorId: localStorageHelper.getItem('user').user.doctor.id
      },
      indexStep: 3,
      lastTimeDuration: new Date()
    }

    this.store.dispatch(updateConsultation({payload, id:this.route.snapshot.paramMap.get('id')}));
      this.store.select(selectStatusConsultations).subscribe((status) => {
        if (status == 'SUCCESS') {
          // window.location.reload();
        }
      });

      this.stepEmitter.emit(5)
  }
  Previous(){
    this.stepEmitter.emit(3)
  }

}
