import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';
import { Paginator } from '../../models/paginator';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private readonly CITY = EndpointsConfig.api.city;

  constructor(private http: CustomHttp) { }

  getAllCities(paginate: Boolean, paginator: Paginator | undefined, search: any){
    let queryParams = {take: 5000, include:'province', search:search, queryString: true}
    if(!queryParams.search || queryParams.search == ''){
      delete queryParams.search
    }
    return this.http.sendRequest(this.CITY.list, null, queryParams);
  }
  getOneCity(id: string){
    return this.http.sendRequest(this.CITY.one, null, {id: id});
  }
}
