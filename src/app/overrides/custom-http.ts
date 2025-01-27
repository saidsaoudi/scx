import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomHttp extends HttpClient {

    constructor(handler: HttpHandler) {
        super(handler);
    }

    prepareURI(endPoint: string, params: any = null) {
        let route = endPoint;

        // Check if `params` object exists
        if (params) {
            // If `queryString` property exists in `params`, construct the query string
            if (params.queryString) {
                // Extract `queryString` property from `params` object and store the rest of the properties in `restParams`
                const { queryString, ...restParams } = params;
                // Convert `restParams` object to URLSearchParams and store the resulting string in `queryParams`
                const queryParams = new URLSearchParams(restParams).toString();
                // Append `queryParams` to the `endPoint` string to construct the complete URI
                route += '?' + queryParams;
            } else if(!params.queryAfterPath) {
                // If there is no `queryString` property, loop through all the properties of `params`
                // and replace any dynamic parameters in the `endPoint` string with their corresponding values in `params`
                Object.keys(params).map((key) => {
                    route = route.replace(`{${key}}`, params[key]);
                });
            }else{

                const queryParams = new URLSearchParams(params.queryAfterPath).toString();
                // Append `queryParams` to the `endPoint` string to construct the complete URI
                
                Object.keys(params).map((key) => {
                    if(key != 'queryAfterPath'){

                        route = route.replace(`{${key}}`, params[key]);
                    }
                });
                route += '?' + queryParams;
                
            }
        }

        // Return the complete URI
        return route;
    }


    sendRequest(route: any, body?: any, params?: any, queryString?: any): Observable<any> {
        const endPoint = this.prepareURI(route.endPoint, params || null);
    
        // Define the acceptable methods as a type using Pick
        const httpMethod: keyof Pick<CustomHttp, 'get' | 'post' | 'put' | 'delete'> = route.method.toLowerCase() as keyof Pick<CustomHttp, 'get' | 'post' | 'put' | 'delete'>;
        
        // If the specified method is not valid, throw an error
        if (!this[httpMethod]) {
            throw new Error(`Invalid method: ${route.method}`);
        }
        
        // Call the appropriate method and return the response
        return this[httpMethod](endPoint, body || {});
    
        // Alternatively, I can combine the above two lines into a single return statement:
        // return this[httpMethod as 'get' | 'post' | 'put' | 'delete'](endPoint, body || {});
    }    
    
}
