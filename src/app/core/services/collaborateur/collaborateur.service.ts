import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';
import { Paginator } from '../../models/paginator';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
  private readonly COLLABORATEUR = EndpointsConfig.api.collaborateur;

  constructor(private http: CustomHttp) { }

  getAllCollaborateurs(paginate: Boolean, paginator: Paginator | undefined){
    return this.http.sendRequest(this.COLLABORATEUR.list, null, {paginate: paginate, page: paginator?.nextPage, queryString: true});
  }
  getOneCollaborateur(uuid: string){
    return this.http.sendRequest(this.COLLABORATEUR.one, null, {collaborateur: uuid});
  }
}
