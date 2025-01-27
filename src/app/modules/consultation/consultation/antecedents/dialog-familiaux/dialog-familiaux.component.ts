import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Maladie } from 'src/app/core/models/maladie';
import { Paginator } from 'src/app/core/models/paginator';
import { AppState } from 'src/app/core/store/app.states';
import { searchMaladies } from 'src/app/core/store/maladie/maladie.action';
import { selectMaladiePayload } from 'src/app/core/store/maladie/maladie.selector';

interface Familiaux {
  name: string;
  code: string;
};
interface Anne {
  name: string;
  code: string;
}

@Component({
  selector: 'app-dialog-familiaux',
  templateUrl: './dialog-familiaux.component.html',
  styleUrls: ['./dialog-familiaux.component.scss']
})
export class DialogFamiliauxComponent implements OnInit {
  familiaux: Familiaux[] ;
  selectedFamiliaux: Familiaux ;

  anne: Anne[] ;

  filtredMaladie: Maladie[] = []
  selectedMaladie: any[] = []
  otherMaladie: any[] = []
  constructor(
    private store: Store<AppState>, private ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.familiaux = [
      { name: 'Mère', code: 'ME' },
      { name: 'Père', code: 'PE' },
      { name: 'Neveu', code: 'NE' },
  ];
  this.anne = [
    { name: '2016', code: 'ME' },
    { name: '2018', code: 'PE' },
    { name: '2023', code: 'NE' },
];
  }

  onSelectMaladie(event: any){
    this.selectedMaladie.push(event.name)
  }
  searchMaladie(event: any){
    console.log('search')
    let querySearch = event.query
    this.store.dispatch(searchMaladies({paginate: true, paginator: new Paginator(), search: querySearch}));
    this.store.select(selectMaladiePayload).subscribe(maladies => {
      this.filtredMaladie = maladies
    });
  }

  deleteMaladie(index: any){
    this.selectedMaladie.splice(index, 1)
  }

  save(){
    console.log('FAM', this.selectedMaladie)
    console.log('OTH', this.otherMaladie)
    this.ref.close({
      selected: this.selectedMaladie,
      others: this.otherMaladie
    })
  }

}
