import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';
import { Paginator } from '../../models/paginator';
import { localStorageHelper } from 'src/app/helpers/localStorage.helper';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private readonly RENDEZVOUS = EndpointsConfig.api.rendezVous;

  constructor(private http: CustomHttp) { }

  getAllRendezVous(paginate: Boolean, paginator: Paginator){
    let queryParams = {
      take: 10000,
      include: {"patient":{"include":{"user":true}},"station":{"include":{"center":true}},"doctor":{"include":{"speciality":true}}},
      where: {"centerId": localStorageHelper.getItem('centerId')},
      queryString: true
    }
    //@ts-ignore
    queryParams.where = JSON.stringify(queryParams.where)
    //@ts-ignore
    queryParams.include = JSON.stringify(queryParams.include)
    return this.http.sendRequest(this.RENDEZVOUS.list, null, queryParams);
  }
  getOnePatient(id: string){
    let queryParams = {include:{"medicalHistory":true, "user":true,"city":{"include":{"province":true}},"haveRights":{"include":{"user":true}}}}
    //@ts-ignore
    queryParams.include = JSON.stringify(queryParams.include)
    return this.http.sendRequest(this.RENDEZVOUS.one, null, {id: id, queryAfterPath: queryParams});
  }
  addRendezVous(payload: any){
    return this.http.sendRequest(this.RENDEZVOUS.create, payload);
  }
  // updatePatient(payload: any, id: any){
  //   return this.http.sendRequest(this.RENDEZVOUS.update, payload, {id});
  // }
  // getMedicamentHistorique(id: string){
  //   return this.http.sendRequest(this.RENDEZVOUS.medicamentHistorique, null, {id: id});
  // }
  // getConstantes(id: string){
  //   let queryString = {
  //     where: {"patientId":parseInt(id)},
  //     queryString: true
  //   }
  //   //@ts-ignore
  //   queryString.where = JSON.stringify(queryString.where)
  //   return this.http.sendRequest(this.RENDEZVOUS.constantes, null, queryString);
  // }
  // getConsultations(id: string){
  //   let queryString = {
  //     include:{"attachements":true,"chiefComplaintConsultations":{"include":{"chiefComplaint":true}},"medicationConsultations":{"include":{"medication":true}},"imagingConsultations":{"include":{"imaging":true}},"analyseConsultations":{"include":{"analyse":true}},"doctor":{"include":{"user":true,"speciality":true}}},
  //     // where: {"patientId":parseInt(id),"NOT":{"endTime":null}},
  //     // orderBy: {"createdAt":"desc"},
  //     where: {"endTime": null, "patientId":parseInt(id)},
  //     orderBy: {"createdAt":"desc"},
  //     queryString: true
  //   }
  //   //@ts-ignore
  //   queryString.include = JSON.stringify(queryString.include)
  //   //@ts-ignore
  //   queryString.where = JSON.stringify(queryString.where)
  //   //@ts-ignore
  //   queryString.orderBy = JSON.stringify(queryString.orderBy)
  //   return this.http.sendRequest(this.RENDEZVOUS.consultations, null, queryString);
  // }
}
