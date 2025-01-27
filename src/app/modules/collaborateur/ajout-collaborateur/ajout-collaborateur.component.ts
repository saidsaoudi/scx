import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.states';
import { selectGroupePayload, selectLoadingGroupes } from 'src/app/core/store/groupe/groupe.selector';
import { fetchGroupes } from 'src/app/core/store/groupe/groupe.action';
import { Groupe } from 'src/app/core/models/groupe';
import { selectDepartementPayload, selectLoadingDepartements } from 'src/app/core/store/departement/departement.selector';
import { fetchDepartements } from 'src/app/core/store/departement/departement.action';
import { Departement } from 'src/app/core/models/departement';
import { fetchCollaborateurs } from 'src/app/core/store/collaborateur/collaborateur.action';
import { selectCollaborateurPayload, selectLoadingCollaborateurs } from 'src/app/core/store/collaborateur/collaborateur.selector';
import { Paginator } from 'src/app/core/models/paginator';
import { Collaborateur } from 'src/app/core/models/collaborateur';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-ajout-collaborateur',
  templateUrl: './ajout-collaborateur.component.html',
  styleUrls: ['./ajout-collaborateur.component.scss']
})
export class AjoutCollaborateurComponent implements OnInit {
  isGroupesLoading$ = this.store.select(selectLoadingGroupes)
  isDepartementsLoading$ = this.store.select(selectLoadingDepartements)
  isCollaborateursLoading$ = this.store.select(selectLoadingCollaborateurs)

  breadcrumb: Array<any> = [];
  regexPhone: RegExp = /^(05|06|07)[0-9]{8}$/;
  formSteps: Array<any> = [];
  nationalities: Array<any> = [];
  selectedNationality: any;
  selectedGroupe: Groupe | undefined;
  selectedDepartement: Departement | undefined;
  selectedSuperieur: any;
  situations: Array<any> = [];
  groupes: any[] = [];
  departements: any[] = [];
  superieurs: any[] = [];
  selectedSituation: any;
  home: Object = {};
  activeIndex = 0;
  personelInfos: FormGroup;
  typeContrat: Array<any> = [];
  selectedTypeContrat: any;
  contrat: FormGroup;
  constructor(private store: Store<AppState>,) {
    this.personelInfos = new FormGroup({
      nom: new FormControl(""),
      prenom: new FormControl(""),
      nationalite: new FormControl(""),
      date_naissance: new FormControl(""),
      situation: new FormControl(""),
      groupe: new FormControl(""),
      superieur: new FormControl(""),
      departement: new FormControl(""),
      nbr_enfant: new FormControl("0"),
      telephone: new FormControl(""),
      diplomes: new FormControl(""),
      experiences_anterieures: new FormControl(""),
    });
    this.contrat = new FormGroup({
      type: new FormControl(""),
    });
  }

  ngOnInit(): void {

    this.fetchGroupes();
    this.fetchDepartements();
    this.fetchCollaborateurs()


    this.breadcrumb = [{ label: 'Listes des collaborateurs', routerLink: '/collaborateurs'}, { label: 'Ajout collaborateur'}];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.formSteps = [
      { label: 'Coordonnées collaborateur' },
      { label: 'Informations du contrat' }
    ];
    this.nationalities = [
        { name: 'Marocaine', code: 'MA' },
        { name: 'Française', code: 'FR' },
    ];
    this.selectedNationality = this.nationalities[0]
    this.situations = [
      { name: 'Célibataire' },
      { name: 'Marié(e)' },
      { name: 'Divorcé(e)' }
    ];
    this.selectedSituation = this.situations[0]

    this.typeContrat = [
      { name: 'CDI' },
      { name: 'CDD' },
      { name: 'STAGE' }
    ];
    this.selectedTypeContrat = this.typeContrat[0]
  }

  next() {
    console.log(this.personelInfos)
    this.activeIndex++;
  }

  prev() {
    this.activeIndex--;
  }

  submit() {
    console.log('Form submitted!');
  }

  imageChange(event: any){
    console.log(event)
  }
  deleteImage(event: any){
    console.log(event)
  }

  fetchGroupes(){
    this.store.dispatch(fetchGroupes());
    this.store.select(selectGroupePayload).subscribe(groupes => {
      this.groupes = this.formatGroupesForDropDown(groupes);
      this.selectedGroupe = this.groupes[0]
    });
  }
  fetchDepartements(){
    this.store.dispatch(fetchDepartements());
    this.store.select(selectDepartementPayload).subscribe(departements => {
      this.departements = this.formatGroupesForDropDown(departements);
      this.selectedDepartement = this.departements[0]
    });
  }
  fetchCollaborateurs(){
    this.store.dispatch(fetchCollaborateurs({paginate: false, paginator: new Paginator}));
    this.store.select(selectCollaborateurPayload).subscribe(collaborateurs => {
      this.superieurs = this.formatCollaborateursForDropDown(collaborateurs);
    });
  }

  formatGroupesForDropDown(groupes: any){
    let result: Object[] = [];
    groupes.forEach( (e: any) => {
      result.push({name: e.nom, id: e.id})
    })

    return result;
  }
  formatDepartementsForDropDown(departements: any){
    let result: Object[] = [];
    departements.forEach( (e: any) => {
      result.push({name: e.nom, id: e.id})
    })

    return result;
  }
  formatCollaborateursForDropDown(collaborateurs: any){
    let result: Object[] = [];
    collaborateurs.forEach( (e: any) => {
      result.push({name: e.nom+' '+e.prenom, id: e.id})
    })

    return result;
  }
}
