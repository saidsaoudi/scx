import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';
import { ULC } from '../../models/ulc';

@Injectable({
  providedIn: 'root'
})
export class UlcService {

  private readonly ULC = EndpointsConfig.api.ulc;

  constructor(private http: CustomHttp) { }

  createULC(data: ULC){
    console.log('DATA',data)
    //@ts-ignore
    return this.http.sendRequest(this.ULC.create, data);
  }
  updateULC(data: any){
    //@ts-ignore
    return this.http.sendRequest(this.ULC.update, data, {groupe: data.get('uuid')});
  }
  getAllULCs(data: any){
    console.log(data)
    //@ts-ignore
    return this.http.sendRequest(this.ULC.list, data);
  }
  getOneULC(uuid: string){
    //@ts-ignore
    return this.http.sendRequest(this.ULC.one, null, {groupe: uuid});
  }
}
