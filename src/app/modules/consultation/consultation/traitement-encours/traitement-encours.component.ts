import { Component,  EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Consultation } from 'src/app/core/models/consultation';
import { Medicament } from 'src/app/core/models/medicament';
import { Paginator } from 'src/app/core/models/paginator';
import { AppState } from 'src/app/core/store/app.states';
import { updateConsultation } from 'src/app/core/store/consultation/consultation.action';
import { selectStatusConsultations } from 'src/app/core/store/consultation/consultation.selector';
import { searchMedicament } from 'src/app/core/store/medicament/medicament.action';
import { selectMedicamentPayload } from 'src/app/core/store/medicament/medicament.selector';
import { PrescriptionComponent } from '../prescription/prescription.component';
interface Bases {
  name: string;
  code: string;
}
@Component({
  selector: 'app-traitement-encours',
  templateUrl: './traitement-encours.component.html',
  styleUrls: ['./traitement-encours.component.scss']
})
export class TraitementEncoursComponent implements OnInit {
  bases: Bases[];

  @Output() stepEmitter = new EventEmitter<any>();
  //@ts-ignore
  @Input() consultation: Consultation
  filtredMedicament: Medicament[] = []
  //@ts-ignore
  selectedMedicament: Medicament
  isChecked = false;
  date_debut: any
  date_fin: any
  traitement: any
  listTraitements: any[] = []


  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.bases = [
      { name: 'ANAM', code: 'AN' },
      { name: 'BASE', code: 'BA' },
      { name: 'LANAM', code: 'LA' }
  ];
    this.getData()
  }

  searchMedicament(event: any) {
    let querySearch = event.query
    this.store.dispatch(searchMedicament({paginate: true, paginator: new Paginator(), search: querySearch}));
    this.store.select(selectMedicamentPayload).subscribe(medicaments => {
      this.filtredMedicament = medicaments
    });

  }

  addTraitement(){
    if(!this.selectedMedicament || !this.traitement || !this.date_debut || (!this.isChecked && !this.date_fin) || (this.date_debut >= this.date_fin)){
      return
    }

    let traitement = {
      medicament: this.selectedMedicament.name,
      medicationId: this.selectedMedicament.id,
      note: this.traitement,
      startTime: this.date_debut,
      endTime: this.date_fin
    }
    this.listTraitements.unshift(JSON.parse(JSON.stringify(traitement)))
  }
  deleteTraitement(i:any){
    this.listTraitements.splice(i, 1)
  }
  switchChecked(){
    this.isChecked = !this.isChecked
    if(this.isChecked)
      this.date_fin = null;
  }

  getData(){
    this.consultation.patient.medicationHistory.forEach(item => {
      let traitement = {
        medicament: item.medication.name,
        medicationId: item.medicationId,
        note: item.note,
        startTime: item.startTime,
        endTime: item.endTime
      }
      this.listTraitements.push(traitement)
    })
  }

  save(){
    //@ts-ignore
    let medicationHistory = [];
    this.listTraitements.forEach(item => {
      delete item['medicament']
      if(!item['endTime']){
        delete item['endTime']
      }
      medicationHistory.push(item)
    })
    //@ts-ignore
    let presMedicament = []
    //@ts-ignore
    let presBio = []
    //@ts-ignore
    let presRadio = []

    let payload= {
      indexStep: 2,
      lastTimeDuration: new Date(),
      //@ts-ignore
      medicationHistory: medicationHistory,
      //@ts-ignore
      analyseConsultations: presBio,
      //@ts-ignore
      imagingConsultations: presRadio,
      //@ts-ignore
      medicationConsultations: presMedicament,


    }

    console.log('PAYLOAD', payload)
    this.store.dispatch(updateConsultation({payload, id:this.route.snapshot.paramMap.get('id')}));
    this.store.select(selectStatusConsultations).subscribe((status) => {
      if (status == 'SUCCESS') {
        // window.location.reload();
      }
    });
    this.stepEmitter.emit(4)
  }
  Previous(){
    this.stepEmitter.emit(2)
  }
}
