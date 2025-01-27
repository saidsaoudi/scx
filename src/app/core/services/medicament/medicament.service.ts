import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';
import { Paginator } from '../../models/paginator';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {
  private readonly MEDICAMENT = EndpointsConfig.api.medicament;

  constructor(private http: CustomHttp) { }

  searchMedicament(paginate: Boolean, paginator: Paginator, search: any){
    let queryParams = {skip: 0, take: 20, search:search, queryString: true}
    if(!queryParams.search || queryParams.search == ''){
      delete queryParams.search
    }
    return this.http.sendRequest(this.MEDICAMENT.list, null, queryParams);
  }
}
