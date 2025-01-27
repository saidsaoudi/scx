import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Collaborateur } from 'src/app/core/models/collaborateur';
import { AppState } from 'src/app/core/store/app.states';
import { fetchOneCollaborateur } from 'src/app/core/store/collaborateur/collaborateur.action';
import {selectLoadingOneCollaborateur, selectOneCollaborateur } from 'src/app/core/store/collaborateur/collaborateur.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-collaborateur',
  templateUrl: './detail-collaborateur.component.html',
  styleUrls: ['./detail-collaborateur.component.scss']
})
export class DetailCollaborateurComponent implements OnInit {
  isLoading$ = this.store.select(selectLoadingOneCollaborateur)
  storage_path = environment.STORAGE
  breadcrumb: Array<any> = [];
  home: Object = {};
  collaborateurUuid: any = null
  //@ts-ignore
  collaborateur: Collaborateur
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {

    this.breadcrumb = [{ label: 'Listes des collaborateurs', routerLink: '/collaborateurs'}, { label: 'Détail collaborateur'}];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    
    this.collaborateurUuid = this.route.snapshot.paramMap.get('uuid');
    this.store.dispatch(fetchOneCollaborateur({uuid: this.collaborateurUuid}));
    this.store.select(selectOneCollaborateur).subscribe(collaborateur  => {
      //@ts-ignore
      this.collaborateur = collaborateur;
    })
  }

}
