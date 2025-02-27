import { Injectable } from '@angular/core';
import { EndpointsConfig } from 'src/app/config';
import { CustomHttp } from 'src/app/overrides/custom-http';
import { StatisticYear } from '../../models/statistic-year';

@Injectable({
  providedIn: 'root'
})
export class StatisticYearService {

  private readonly STATISTIC = EndpointsConfig.api.statisticYear;

  constructor(private http: CustomHttp) { }

  createStatistic(data: StatisticYear){
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
}
