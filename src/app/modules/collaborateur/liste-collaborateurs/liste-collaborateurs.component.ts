import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Collaborateur } from 'src/app/core/models/collaborateur';
import { Paginator } from 'src/app/core/models/paginator';
import { AppState } from 'src/app/core/store/app.states';
import { fetchCollaborateurs } from 'src/app/core/store/collaborateur/collaborateur.action';
import { selectCollaborateurPayload, selectLoadingCollaborateurs } from 'src/app/core/store/collaborateur/collaborateur.selector';
import { selectPagination } from 'src/app/core/store/pagination/pagination.selector';

@Component({
  selector: 'app-liste-collaborateurs',
  templateUrl: './liste-collaborateurs.component.html',
  styleUrls: ['./liste-collaborateurs.component.scss'],
})
export class ListeCollaborateursComponent implements OnInit {

  isLoading$ = this.store.select(selectLoadingCollaborateurs)

  collaborateurs: Collaborateur[] = []
  pagination!: Paginator
  headers = ['Nom', 'Prénom']
  breadcrumb: Array<any> = [];
  home: Object = {};
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [{ label: 'Listes des collaborateurs'}];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.store.dispatch(fetchCollaborateurs({paginate: true, paginator: new Paginator()}));
    this.store.select(selectCollaborateurPayload).subscribe(collaborateurs => {
      this.collaborateurs = collaborateurs
      this.store.select(selectPagination).subscribe(pagination => {
        this.pagination = pagination
      })
    });
  }

  paginate($event: any){
    console.log($event)
    const paginator = {
      currentPage: $event.page,
      nextPage: $event.page + 1,
      pageSize: $event.pageCount,
      totalItems: this.pagination.totalItems,
    }
    this.store.dispatch(fetchCollaborateurs({paginate: true, paginator}));
  }

}
