import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogPersonnelsComponent } from './dialog-personnels/dialog-personnels.component';
import { DialogFamiliauxComponent } from './dialog-familiaux/dialog-familiaux.component';
import { DialogHabitudesToxiquesComponent } from './dialog-habitudes-toxiques/dialog-habitudes-toxiques.component';
import { DialogAllergiquesComponent } from './dialog-allergiques/dialog-allergiques.component';
import { Consultation } from 'src/app/core/models/consultation';
import { AppState } from 'src/app/core/store/app.states';
import { Store } from '@ngrx/store';
import { updateConsultation } from 'src/app/core/store/consultation/consultation.action';
import { selectStatusConsultations } from 'src/app/core/store/consultation/consultation.selector';
import { ActivatedRoute } from '@angular/router';
import { DialogGynecoobstetricauxComponent } from './dialog-gynecoobstetricaux/dialog-gynecoobstetricaux.component';


@Component({
  selector: 'app-antecedents',
  templateUrl: './antecedents.component.html',
  styleUrls: ['./antecedents.component.scss'],
  providers: [DialogService]
})
export class AntecedentsComponent implements OnInit {
  @Output() stepEmitter = new EventEmitter<any>();
  //@ts-ignore
  @Input() consultation: Consultation

  antecedentPersonnel: any = {
    medical: [], // Initialize 'medical' as an empty array
    surgical: [], // Initialize 'surgical' as an empty array
  };

  antecedentFamille: any = {
    selected: [],
    others: []
  };

  antecedentAllergy: any = []

  antecedentToxic: any

  constructor(private dialogService: DialogService, private route: ActivatedRoute, private store: Store<AppState>,) {
  }

  ngOnInit(): void {
  }

  addpersonnel() {
    const ref = this.dialogService.open(DialogPersonnelsComponent, {
      header: 'Nouveau antécédent personnels',
      width: '60%',
      data: {}
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
      if(data){
        if(data.medical[0].motif){
          //@ts-ignore
          this.antecedentPersonnel['medical'].push(...data.medical)
        }
        if(data.surgical[0].motif){
          //@ts-ignore
          this.antecedentPersonnel['surgical'].push(...data.surgical)
        }
        
      }
      console.log('LL', this.antecedentPersonnel)
    });
  }

  addfamiliaux() {
    const ref = this.dialogService.open(DialogFamiliauxComponent, {
      header: 'Nouveau antécédents familiaux',
      width: '60%',
      data: {}
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
      if(data && data.selected && data.selected.length) this.antecedentFamille.selected.push(...data.selected)
      if(data && data.others && data.others.length) this.antecedentFamille.others.push(...data.others)
    });
  }
  
  addhabitudestoxiques() {
    const ref = this.dialogService.open(DialogHabitudesToxiquesComponent, {
      header: 'Ajouter Habitudes toxiques',
      width: '60%',
      data: {}
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
      if(data){
        this.antecedentToxic = data
      }
    });
  }

  addallergiques() {
    const ref = this.dialogService.open(DialogAllergiquesComponent, {
      header: 'Ajouter Allergiques',
      width: '60%',
      data: {}
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
      this.antecedentAllergy = data
    });
  }

  addgynecoobstetri() {
    const ref = this.dialogService.open(DialogGynecoobstetricauxComponent, {
      header: 'Antécédents Gynéco-obstétricaux',
      width: '80%',
      data: {}
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }





  deleteSurgical(index: any){
    this.antecedentPersonnel.surgical.splice(index, 1)
  }

  deleteMedical(index: any){
    this.antecedentPersonnel.medical.splice(index, 1)
  }
  
  deleteFamille(index: any){
    this.antecedentFamille.selected.splice(index, 1)
  }
  deleteOthers(index: any){
    this.antecedentFamille.others.splice(index, 1)
  }
  deleteAllergy(index: any){
    this.antecedentAllergy.splice(index, 1)
  }

  addAntecendents(){
    let allergy = [...this.antecedentAllergy];
    let medical = [...this.antecedentPersonnel.medical];
    let surgical = [...this.antecedentPersonnel.surgical];
    if (Array.isArray(this.consultation.medicalHistory?.allergy)) {
      allergy = [...this.antecedentAllergy, ...this.consultation.medicalHistory?.allergy];
    }
    if (Array.isArray(this.consultation.medicalHistory?.medical)) {
      medical = [...this.antecedentPersonnel.medical, ...this.consultation.medicalHistory?.medical];
    }
    if (Array.isArray(this.consultation.medicalHistory?.surgical)) {
      surgical = [...this.antecedentPersonnel.surgical, ...this.consultation.medicalHistory?.surgical];
    }

    let payload = {
        medicalHistory: {
            allergy: allergy,
            medical: medical,
            surgical: surgical,
            family: {
                others: (this.antecedentFamille) ? this.antecedentFamille.others : this.consultation.medicalHistory?.family?.others,
                selected: (this.antecedentFamille) ? this.antecedentFamille.selected : this.consultation.medicalHistory?.family?.selected,
            },
            toxic: (this.antecedentToxic) ? this.antecedentToxic : this.consultation.medicalHistory?.toxic
        },
        indexStep: 1,
        lastTimeDuration: new Date()
      }

      this.store.dispatch(updateConsultation({payload, id:this.route.snapshot.paramMap.get('id')}));
      this.store.select(selectStatusConsultations).subscribe((status) => {
        if (status == 'SUCCESS') {
          // window.location.reload();
        }
      });
      this.stepEmitter.emit(3)
  }
  Previous(){
    this.stepEmitter.emit(1)
  }
  
}
