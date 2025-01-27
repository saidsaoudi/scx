import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { Paginator } from '../../models/paginator';
import { CustomHttp } from 'src/app/overrides/custom-http';

@Injectable({
  providedIn: 'root'
})
export class ImagerieService {

  private readonly IMAGERIE = EndpointsConfig.api.imagerie;

  constructor(private http: CustomHttp) { }

  searchImagerie(paginate: Boolean, paginator: Paginator, search: any){
    let queryParams = {skip: 0, take: 20, search:search, queryString: true}
    if(!queryParams.search || queryParams.search == ''){
      delete queryParams.search
    }
    return this.http.sendRequest(this.IMAGERIE.list, null, queryParams);
  }
}