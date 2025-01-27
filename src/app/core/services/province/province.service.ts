import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';
import { Paginator } from '../../models/paginator';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  private readonly PROVINCE = EndpointsConfig.api.province;

  constructor(private http: CustomHttp) { }

  getAllProvinces(paginate: Boolean, paginator: Paginator | undefined, search: any){
    let queryParams = {take: 400, search:search, queryString: true}
    if(!queryParams.search || queryParams.search == ''){
      delete queryParams.search
    }
    return this.http.sendRequest(this.PROVINCE.list, null, queryParams);
  }
  getOneProvinces(id: string){
    return this.http.sendRequest(this.PROVINCE.one, null, {id: id});
  }
}
