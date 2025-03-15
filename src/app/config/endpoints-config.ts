import { environment } from "src/environments/environment";

export class EndpointsConfig {
    private static url = environment.URL;
    public static get api(){
        return {
            auth: {
                login: {
                    endPoint: this.url+'auth/login',
                    method: 'post'
                },
                me: {
                    endPoint: this.url+'auth/me',
                    method: 'get'
                },
                logout: {
                    endPoint: this.url+'auth/logout',
                    method: 'post'
                },
            },
            ulc:{
                create: {
                    endPoint: this.url+'ucls/create',
                    method: 'post'
                },
                update: {
                    endPoint: this.url+'ulcs/{ulc}/update',
                    method: 'post'
                },
                list: {
                    endPoint: this.url+'ulcs',
                    method: 'post'
                },
                one: {
                    endPoint: this.url+'ulc/{ulc}',
                    method: 'get'
                }
            },
            statistic:{
                create: {
                    endPoint: this.url+'statistics/create',
                    method: 'post'
                },
                update: {
                    endPoint: this.url+'statistics/{statistic}/update',
                    method: 'post'
                },
                list: {
                    endPoint: this.url+'statistic/fetch',
                    method: 'post'
                },
                min_max: {
                    endPoint: this.url+'statistic/fetch/minmax',
                    method: 'post'
                },
                one: {
                    endPoint: this.url+'statistic/{statistic}',
                    method: 'get'
                },
                upload: {
                    endPoint: this.url+'statistic/import',
                    method: 'post'
                }
            },
            statisticYear:{
                create: {
                    endPoint: this.url+'statistics/create',
                    method: 'post'
                },
                update: {
                    endPoint: this.url+'statistics/{statistic}/update',
                    method: 'post'
                },
                list: {
                    endPoint: this.url+'statistic/fetch/year',
                    method: 'post'
                },
                one: {
                    endPoint: this.url+'statistic/{statistic}',
                    method: 'get'
                }
            },
        }
    }
}
