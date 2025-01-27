import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private readonly DEPARTEMENT = EndpointsConfig.api.departement;

  constructor(private http: CustomHttp) { }

  getAllDepartements(){
    return this.http.sendRequest(this.DEPARTEMENT.list);
  }
  getOneDepartement(uuid: string){
    return this.http.sendRequest(this.DEPARTEMENT.one, null, {departement: uuid});
  }
}
