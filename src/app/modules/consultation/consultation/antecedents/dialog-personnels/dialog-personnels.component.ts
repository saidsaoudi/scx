import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Maladie } from 'src/app/core/models/maladie';
import { Paginator } from 'src/app/core/models/paginator';
import { AppState } from 'src/app/core/store/app.states';
import { searchMaladies } from 'src/app/core/store/maladie/maladie.action';
import { selectMaladiePayload } from 'src/app/core/store/maladie/maladie.selector';

@Component({
  selector: 'app-dialog-personnels',
  templateUrl: './dialog-personnels.component.html',
  styleUrls: ['./dialog-personnels.component.scss']
})
export class DialogPersonnelsComponent implements OnInit {
  filtredPersonnelMaladie: Maladie[] = []
  selectedPersonnelMaladie: any[] = []
  filtredSurigicalMaladie: Maladie[] = []
  selectedSurigicalMaladie: any[] = []


  anne: Array<any> = [];

  personnelForm: FormGroup;
  surigicalForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private ref: DynamicDialogRef,) {
    const personnel = new FormGroup({
      year: this.fb.control('', [Validators.required]),
    });
    const surgical = new FormGroup({
      year: this.fb.control('', [Validators.required]),
    });
    this.personnelForm = this.fb.group({
      personnels: this.fb.array([
        personnel
      ]),
    });
    this.surigicalForm = this.fb.group({
      surigicals: this.fb.array([
        surgical
      ])
    });
  }

  addPersonnel() {
    const newFormGroup = this.fb.group({
      year: [''],
      // Add more form controls as needed
    });
    const personnels = this.personnelForm.get('personnels') as FormArray;
    personnels.push(newFormGroup);
  }
  deletePersonnel(index: number) {
    const personnels = this.personnelForm.get('personnels') as FormArray;
    personnels.removeAt(index);
  }
  get personnels() {
    return this.personnelForm.get('personnels') as FormArray;
  }
  get surigicals() {
    return this.surigicalForm.get('surigicals') as FormArray;
  }

  addSurigical() {
    const newFormGroup = this.fb.group({
      year: [''],
      // Add more form controls as needed
    });
    const surigicals = this.surigicalForm.get('surigicals') as FormArray;
    surigicals.push(newFormGroup);
  }

  deleteSurigical(index: number) {
    const surigicals = this.surigicalForm.get('surigicals') as FormArray;
    surigicals.removeAt(index);
  }
  ngOnInit(): void {
    for(let i = 1959; i<=new Date().getFullYear(); i++){
      this.anne.push({
        name: i
      })
    }
  }




  onSelectPersonnelMaladie(event: any, index: any){
    if(this.selectedPersonnelMaladie[index]){
      this.selectedPersonnelMaladie[index].push(event)
    }else{
      this.selectedPersonnelMaladie.splice(index, 0, [event])
    }
  }
  searchPersonnelMaladie(event: any){
    console.log('search')
    let querySearch = event.query
    this.store.dispatch(searchMaladies({paginate: true, paginator: new Paginator(), search: querySearch}));
    this.store.select(selectMaladiePayload).subscribe(maladies => {
      this.filtredPersonnelMaladie = maladies
    });
  }
  onSelectSurigicalMaladie(event: any, index: any){
    if(this.selectedSurigicalMaladie[index]){
      this.selectedSurigicalMaladie[index].push(event)
    }else{
      this.selectedSurigicalMaladie.splice(index, 0, [event])
    }
  }
  searchSurigicalMaladie(event: any){
    console.log('search')
    let querySearch = event.query
    this.store.dispatch(searchMaladies({paginate: true, paginator: new Paginator(), search: querySearch}));
    this.store.select(selectMaladiePayload).subscribe(maladies => {
      this.filtredSurigicalMaladie = maladies
    });
  }
  deleteSelectedPersonnelMaladie(parentIndex: any, index: any){
    this.selectedPersonnelMaladie[parentIndex].splice(index, 1)
  }
  deleteSelectedSurigicalMaladie(parentIndex: any, index: any){
    this.selectedSurigicalMaladie[parentIndex].splice(index, 1)
  }

  save(){
    if(this.selectedPersonnelMaladie.length){
      this.personnels.value.forEach((element: any, index: any) => {
        element['motif'] = []
        this.selectedPersonnelMaladie[index].forEach((item: any) => {
          element['year'] = element['year'].name
          element['motif'].push(item.name)
        })
      });
    }
    if(this.selectedSurigicalMaladie.length){
      this.surigicals.value.forEach((element: any, index: any) => {
        element['motif'] = []
        this.selectedSurigicalMaladie[index].forEach((item: any) => {
          element['year'] = element['year'].name
          element['motif'].push(item.name)
        })
      });
    }
    this.ref.close(
      {
        medical: this.personnels.value,
        surgical: this.surigicals.value,
      }
    )
  }


}
