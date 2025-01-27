import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Consultation } from 'src/app/core/models/consultation';
import { Paginator } from 'src/app/core/models/paginator';
import { searchAnalyse } from 'src/app/core/store/analyse/analyse.action';
import { selectAnalysePayload } from 'src/app/core/store/analyse/analyse.selector';
import { AppState } from 'src/app/core/store/app.states';
import { searchImagerie } from 'src/app/core/store/imagerie/imagerie.action';
import { selectImageriePayload } from 'src/app/core/store/imagerie/imagerie.selector';
import { searchMedicament } from 'src/app/core/store/medicament/medicament.action';
import { selectMedicamentPayload } from 'src/app/core/store/medicament/medicament.selector';

interface Bases {
  name: string;
  code: string;
}
@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  bases: Bases[];
  //@ts-ignore
  @Input() consultation: Consultation
  filtredMedicament: any[] = []
  filtredAnalyse: any[] = []
  filtredImagerie: any[] = []
  medicamentForm: FormGroup;
  biologiqueForm: FormGroup;
  radiologiqueForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    ) { 
    this.medicamentForm = this.fb.group({
      medicaments: this.fb.array([
      ])
    });
    this.biologiqueForm = this.fb.group({
      biologiques: this.fb.array([
      ])
    });
    this.radiologiqueForm = this.fb.group({
      radiologiques: this.fb.array([
      ])
    });
  }

  ngOnInit(): void {
    
    this.bases = [
      { name: 'ANAM', code: 'AN' },
      { name: 'BASE', code: 'BA' },
      { name: 'LANAM', code: 'LA' }
  ];
    if(this.consultation){

      if(this.consultation?.medicationConsultations){
        this.consultation?.medicationConsultations.forEach((item: any) => {
          let form = new FormGroup({
            medicament: this.fb.control(item.medication),
            matin: this.fb.control(item.morning),
            midi: this.fb.control(item.evening),
            soir: this.fb.control(item.noon),
            duree: this.fb.control(item.period),
            jour: this.fb.control('jour'),
            comment: this.fb.control(item.note),
          });
          this.medicaments.push(form);
        })
      }
      if(this.consultation?.analyseConsultations){
        this.consultation?.analyseConsultations.forEach((item: any) => {
          let form = new FormGroup({
            analyse: this.fb.control(item.analyse),
            comment: this.fb.control(item.note),
          });
          this.biologiques.push(form);
        })
      }
      if(this.consultation?.imagingConsultations){
        this.consultation?.imagingConsultations.forEach((item: any) => {
          let form = new FormGroup({
            imagerie: this.fb.control(item.imaging),
            comment: this.fb.control(item.note),
          });
          this.radiologiques.push(form);
        })
      }

    }

  }
  searchMedicament(event: any) {
    let querySearch = event.query
    this.store.dispatch(searchMedicament({paginate: true, paginator: new Paginator(), search: querySearch}));
    this.store.select(selectMedicamentPayload).subscribe(medicaments => {
      this.filtredMedicament = medicaments
    });

  }
  searchAnalyse(event: any) {
    let querySearch = event.query
    this.store.dispatch(searchAnalyse({paginate: true, paginator: new Paginator(), search: querySearch}));
    this.store.select(selectAnalysePayload).subscribe(analyse => {
      this.filtredAnalyse = analyse
    });

  }
  searchImagerie(event: any) {
    let querySearch = event.query
    this.store.dispatch(searchImagerie({paginate: true, paginator: new Paginator(), search: querySearch}));
    this.store.select(selectImageriePayload).subscribe(imagerie => {
      this.filtredImagerie = imagerie
    });

  }
  get medicaments() {
    return this.medicamentForm.get('medicaments') as FormArray;
  }
  get biologiques() {
    return this.biologiqueForm.get('biologiques') as FormArray;
  }
  get radiologiques() {
    return this.radiologiqueForm.get('radiologiques') as FormArray;
  }
  addMedicament() {
    let form = new FormGroup({
      medicament: this.fb.control(''),
      matin: this.fb.control(0),
      midi: this.fb.control(0),
      soir: this.fb.control(0),
      duree: this.fb.control(0),
      jour: this.fb.control('jour'),
      comment: this.fb.control(''),
    });
    this.medicaments.push(form);
  }

  deleteMedicament(index: number) {
    this.medicaments.removeAt(index);
  }

  addBiologique() {
    let form = new FormGroup({
      analyse: this.fb.control(''),
      comment: this.fb.control(''),
    });
    this.biologiques.push(form);
  }

  deleteBiologique(index: number) {
    this.biologiques.removeAt(index);
  }

  addRadiologique() {
    let form = new FormGroup({
      imagerie: this.fb.control(''),
      comment: this.fb.control(''),
    });
    this.radiologiques.push(form);
  }

  deleteRadiologique(index: number) {
    this.radiologiques.removeAt(index);
  }

}
