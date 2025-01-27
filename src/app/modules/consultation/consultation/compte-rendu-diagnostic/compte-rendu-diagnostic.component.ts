import { Component, OnInit,Input, EventEmitter, Output  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Consultation } from 'src/app/core/models/consultation';
import { Maladie } from 'src/app/core/models/maladie';
import { Paginator } from 'src/app/core/models/paginator';
import { AppState } from 'src/app/core/store/app.states';
import { updateConsultation } from 'src/app/core/store/consultation/consultation.action';
import { selectStatusConsultations } from 'src/app/core/store/consultation/consultation.selector';
import { searchMaladies } from 'src/app/core/store/maladie/maladie.action';
import { selectMaladiePayload } from 'src/app/core/store/maladie/maladie.selector';
import { ListeGlobalComponent } from './liste-global/liste-global.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-compte-rendu-diagnostic',
  templateUrl: './compte-rendu-diagnostic.component.html',
  styleUrls: ['./compte-rendu-diagnostic.component.scss'],
  providers: [DialogService]
})
export class CompteRenduDiagnosticComponent implements OnInit {
  @Output() stepEmitter = new EventEmitter<any>();
  //@ts-ignore
  @Input() consultation: Consultation
  filtredMaladie: Maladie[] = []
  //@ts-ignore
  selectedMaladie: Maladie
  selectedSecondaryMaladie: any[] = []
  compteRendu = null
  constructor(private store: Store<AppState>, private route: ActivatedRoute,  private dialogService: DialogService) { }

  ngOnInit(): void {
    if(this.consultation){
      if(this.consultation.chiefComplaintConsultations.length){
        this.selectedMaladie = this.consultation.chiefComplaintConsultations.find((item: any) => item.type == 'primary').chiefComplaint
        console.log('HERE', this.selectedMaladie)
        this.consultation.chiefComplaintConsultations.filter((item: any) => item.type == 'secondary').forEach((item: any) => {
          this.selectedSecondaryMaladie.push(item.chiefComplaint)
        })

        this.compteRendu = this.consultation.motifComplaint[0]
      }
    }
  }
  onSelectMaladie(event: any){
    this.selectedSecondaryMaladie.push(event)
  }
  deleteMaladie(index: any){
    this.selectedSecondaryMaladie.splice(index, 1)
  }

  searchMaladie(event: any){
    console.log('search')
    let querySearch = event.query
    this.store.dispatch(searchMaladies({paginate: true, paginator: new Paginator(), search: querySearch}));
    this.store.select(selectMaladiePayload).subscribe(maladies => {
      this.filtredMaladie = maladies
    });
  }

  save(){
    let secondary = [{
      chiefComplaintId: this.selectedMaladie.id,
      type: "primary"
    }];
    this.selectedSecondaryMaladie.forEach((element: any) => {
      secondary.push({
        chiefComplaintId: element.id,
        type: "secondary"
      })
    });
    let payload = {
      chiefComplaintConsultations: secondary,
      motifComplaint: [this.compteRendu],
      // comment: 'TEST COMMENT',
      // note: 'TEST NOTE',
      indexStep: 5,
      lastTimeDuration: new Date()
    }

    console.log('PAYLOAD', payload)
    this.store.dispatch(updateConsultation({payload, id:this.route.snapshot.paramMap.get('id')}));
    this.store.select(selectStatusConsultations).subscribe((status) => {
      if (status == 'SUCCESS') {
        // window.location.reload();
      }
    });
   
  }

  Previous(){
    this.stepEmitter.emit(5)
  }

  Listglobal() {
    const ref = this.dialogService.open(ListeGlobalComponent, {
      header: 'Liste globale des diagnostics',
      width: '80%',
      data: {}
    });

    ref.onClose.subscribe((data) => {
      console.log('Dialog closed with data:', data);
    });
  }
}
