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
            patient:{
                list: {
                    endPoint: this.url+'patient',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'patient/{id}',
                    method: 'get'
                },
                create: {
                    endPoint: this.url+'patient',
                    method: 'post'
                },
                update: {
                    endPoint: this.url+'patient/{id}',
                    method: 'patch'
                },
                medicamentHistorique: {
                    endPoint: this.url+'patient/medicationHistory/{id}',
                    method: 'get'
                },
                constantes: {
                    endPoint: this.url+'vitalSigns',
                    method: 'get'
                },
                consultations: {
                    endPoint: this.url+'consultation',
                    method: 'get'
                }
            },
            province:{
                list: {
                    endPoint: this.url+'province',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'province/{id}',
                    method: 'get'
                }
            },
            city:{
                list: {
                    endPoint: this.url+'city',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'city/{id}',
                    method: 'get'
                }
            },
            medicament:{
                list: {
                    endPoint: this.url+'medication',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'medication/{id}',
                    method: 'get'
                }
            },
            analyse:{
                list: {
                    endPoint: this.url+'analyse',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'analyse/{id}',
                    method: 'get'
                }
            },
            imagerie:{
                list: {
                    endPoint: this.url+'imaging',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'imaging/{id}',
                    method: 'get'
                }
            },
            maladie:{
                list: {
                    endPoint: this.url+'chiefComplaint',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'chiefComplaint/{id}',
                    method: 'get'
                }
            },
            specialite:{
                list: {
                    endPoint: this.url+'speciality',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'speciality/{id}',
                    method: 'get'
                },
                days: {
                    endPoint: this.url+'speciality/days/{id}',
                    method: 'get'
                },
                slots: {
                    endPoint: this.url+'speciality/slots/{id}',
                    method: 'get'
                }
            },
            rendezVous:{
                list: {
                    endPoint: this.url+'appointment',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'appointment/{id}',
                    method: 'get'
                },
                create: {
                    endPoint: this.url+'appointment',
                    method: 'post'
                },
            },
            consultation:{
                list: {
                    endPoint: this.url+'consultation',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'consultation/{id}',
                    method: 'get'
                },
                create: {
                    endPoint: this.url+'consultation',
                    method: 'post'
                },
                update: {
                    endPoint: this.url+'consultation/{id}',
                    method: 'patch'
                }
            },





































            collaborateur:{
                list: {
                    endPoint: this.url+'collaborateurs',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'collaborateurs/{collaborateur}',
                    method: 'get'
                }
            },
            groupe:{
                list: {
                    endPoint: this.url+'groupes',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'groupe/{groupe}',
                    method: 'get'
                }
            },
            departement:{
                list: {
                    endPoint: this.url+'departements',
                    method: 'get'
                },
                one: {
                    endPoint: this.url+'departements/{departement}',
                    method: 'get'
                }
            }
        }
    }
}
