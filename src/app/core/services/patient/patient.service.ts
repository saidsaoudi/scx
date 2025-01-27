import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';
import { Paginator } from '../../models/paginator';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly PATIENT = EndpointsConfig.api.patient;

  constructor(private http: CustomHttp) { }

  getAllPatients(paginate: Boolean, paginator: Paginator, search: any){
    let queryParams = {
      skip: paginator?.nextPage,
      take: paginator?.pageSize,
      search:search, include:'user',
      orderBy: {"updatedAt": "desc"},
      queryString: true
    }
    //@ts-ignore
    queryParams.orderBy = JSON.stringify(queryParams.orderBy)
    if(!queryParams.search || queryParams.search == ''){
      delete queryParams.search
    }
    return this.http.sendRequest(this.PATIENT.list, null, queryParams);
  }
  getOnePatient(id: string){
    let queryParams = {include:{"vitalSigns":true, "medicalHistory":true, "user":true,"city":{"include":{"province":true}},"haveRights":{"include":{"user":true}}}}
    //@ts-ignore
    queryParams.include = JSON.stringify(queryParams.include)
    return this.http.sendRequest(this.PATIENT.one, null, {id: id, queryAfterPath: queryParams});
  }
  addPatient(payload: any){
    return this.http.sendRequest(this.PATIENT.create, payload);
  }
  updatePatient(payload: any, id: any){
    return this.http.sendRequest(this.PATIENT.update, payload, {id});
  }
  getMedicamentHistorique(id: string){
    return this.http.sendRequest(this.PATIENT.medicamentHistorique, null, {id: id});
  }
  getConstantes(id: string){
    let queryString = {
      where: {"patientId":parseInt(id)},
      queryString: true
    }
    //@ts-ignore
    queryString.where = JSON.stringify(queryString.where)
    return this.http.sendRequest(this.PATIENT.constantes, null, queryString);
  }
  getConsultations(id: string){
    let queryString = {
      include:{"attachements":true,"chiefComplaintConsultations":{"include":{"chiefComplaint":true}},"medicationConsultations":{"include":{"medication":true}},"imagingConsultations":{"include":{"imaging":true}},"analyseConsultations":{"include":{"analyse":true}},"doctor":{"include":{"user":true,"speciality":true}},"specialist":{"include":{"user":true,"speciality":true}}},
      where: {"patientId":parseInt(id),"NOT":{"endTime":null}},
      // orderBy: {"createdAt":"desc"},
      // where: {"endTime": null, "patientId":parseInt(id)},
      orderBy: {"createdAt":"desc"},
      queryString: true
    }
    //@ts-ignore
    queryString.include = JSON.stringify(queryString.include)
    //@ts-ignore
    queryString.where = JSON.stringify(queryString.where)
    //@ts-ignore
    queryString.orderBy = JSON.stringify(queryString.orderBy)
    return this.http.sendRequest(this.PATIENT.consultations, null, queryString);
  }
  getCurrentConsultations(id: string){
    let queryString = {
      include:{"attachements":true,"chiefComplaintConsultations":{"include":{"chiefComplaint":true}},"medicationConsultations":{"include":{"medication":true}},"imagingConsultations":{"include":{"imaging":true}},"analyseConsultations":{"include":{"analyse":true}},"doctor":{"include":{"user":true,"speciality":true}},"specialist":{"include":{"user":true,"speciality":true}}},
      // where: {"patientId":parseInt(id),"NOT":{"endTime":null}},
      // orderBy: {"createdAt":"desc"},
      where: {"endTime": null, "patientId":parseInt(id)},
      orderBy: {"createdAt":"desc"},
      queryString: true
    }
    //@ts-ignore
    queryString.include = JSON.stringify(queryString.include)
    //@ts-ignore
    queryString.where = JSON.stringify(queryString.where)
    //@ts-ignore
    queryString.orderBy = JSON.stringify(queryString.orderBy)
    return this.http.sendRequest(this.PATIENT.consultations, null, queryString);
  }
}
