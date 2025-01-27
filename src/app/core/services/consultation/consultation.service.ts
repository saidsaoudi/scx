import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';
import { Paginator } from '../../models/paginator';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private readonly CONSULTATION = EndpointsConfig.api.consultation;

  constructor(private http: CustomHttp) { }

  getAllConsultations(paginate: Boolean, paginator: Paginator, search: any){
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
    return this.http.sendRequest(this.CONSULTATION.list, null, queryParams);
  }
  getOneConsultation(id: string){
    let queryParams = {
      include:{'chiefComplaintConsultations': {"include":{"chiefComplaint": true}}, 'medicationConsultations':{"include":{"medication": true}} ,'analyseConsultations': {"include":{"analyse": true}},'imagingConsultations': {"include":{"imaging": true}},'medicalHistory': true, 'patient':{"include":{"user":true, 'medicationHistory': {'include': {"medication": true}}}}}
    }
    //@ts-ignore
    // queryParams.include.patient = JSON.stringify(queryParams.include.patient)
    //@ts-ignore
    queryParams.include = JSON.stringify(queryParams.include)
    return this.http.sendRequest(this.CONSULTATION.one, null, {id: id, queryAfterPath: queryParams});
  }
  addConsultation(payload: any){
    return this.http.sendRequest(this.CONSULTATION.create, payload);
  }
  updateConsultation(payload: any, id: any){
    return this.http.sendRequest(this.CONSULTATION.update, payload, {id});
  }

}
