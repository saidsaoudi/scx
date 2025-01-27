import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  private readonly GROUPE = EndpointsConfig.api.groupe;

  constructor(private http: CustomHttp) { }

  getAllGroupes(){
    return this.http.sendRequest(this.GROUPE.list);
  }
  getOneGroupe(uuid: string){
    return this.http.sendRequest(this.GROUPE.one, null, {groupe: uuid});
  }
}
