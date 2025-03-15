import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';
import { Statistic } from '../../models/statistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private readonly STATISTIC = EndpointsConfig.api.statistic;

  constructor(private http: CustomHttp) { }

  createStatistic(data: Statistic){
    console.log('DATA',data)
    //@ts-ignore
    return this.http.sendRequest(this.STATISTIC.create, data);
  }
  updateStatistic(data: any){
    //@ts-ignore
    return this.http.sendRequest(this.STATISTIC.update, data, {statistic: data.get('uuid')});
  }
  getAllStatistics(data: any){
    //@ts-ignore
    return this.http.sendRequest(this.STATISTIC.list, data);
  }
  getOneStatistic(uuid: string){
    //@ts-ignore
    return this.http.sendRequest(this.STATISTIC.one, null, {statistic: uuid});
  }
  fetchMinMaxStatistics(data: any){
    //@ts-ignore
    return this.http.sendRequest(this.STATISTIC.min_max, data);
  }

  // Helper function to upload the file
  uploadFile(formData: any) {
    //@ts-ignore
    return this.http.sendRequest(this.STATISTIC.upload, formData);
  }
}
