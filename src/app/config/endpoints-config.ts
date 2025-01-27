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
            }
        }
    }
}
