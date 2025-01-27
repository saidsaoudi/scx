import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';
import { Paginator } from '../../models/paginator';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  private readonly SPECIALITE = EndpointsConfig.api.specialite;

  constructor(private http: CustomHttp) { }

  searchSpecialite(paginate: Boolean, paginator: Paginator, search: any){
    let queryParams = {skip: 0, take: 20, search:search, queryString: true}
    if(!queryParams.search || queryParams.search == ''){
      delete queryParams.search
    }
    return this.http.sendRequest(this.SPECIALITE.list, null, queryParams);
  }
  getDaysBySpecialite(id: string){
    return this.http.sendRequest(this.SPECIALITE.days, null, {id});
  }
  getSlotsBySpecialite(id: string, date: string){
    let queryParams = {"date": date}
    //@ts-ignore
    // queryParams = JSON.stringify(queryParams)
    return this.http.sendRequest(this.SPECIALITE.slots, null, {id: id, queryAfterPath: queryParams});
  }
}
