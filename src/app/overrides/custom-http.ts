import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomHttp extends HttpClient {
  constructor(handler: HttpHandler) {
    super(handler);
  }

  // Prépare l'URL avec les paramètres dynamiques ou query strings
  prepareURI(endPoint: string, params: Record<string, any> = {}): string {
    let route = endPoint;

    // Remplacement des paramètres dynamiques dans l'URL (ex: /user/{id})
    Object.keys(params).forEach((key) => {
      if (route.includes(`{${key}}`)) {
        route = route.replace(`{${key}}`, encodeURIComponent(params[key]));
        delete params[key]; // Supprime les clés utilisées
      }
    });

    // Ajout des query strings si des paramètres restent
    const queryParams = new URLSearchParams(params).toString();
    if (queryParams) {
      route += `?${queryParams}`;
    }

    return route;
  }

  // Envoie une requête HTTP générique
  sendRequest(
    route: { endPoint: string; method: 'GET' | 'POST' | 'PUT' | 'DELETE'; headers?: Record<string, string> },
    body?: any,
    params?: Record<string, any>
  ): Observable<any> {
    const url = this.prepareURI(route.endPoint, params || {});
    const httpHeaders = new HttpHeaders(route.headers || {});

    // Valide et envoie la requête HTTP
    switch (route.method.toUpperCase()) {
      case 'GET':
        return this.get(url, { headers: httpHeaders });
      case 'POST':
        return this.post(url, body, { headers: httpHeaders });
      case 'PUT':
        return this.put(url, body, { headers: httpHeaders });
      case 'DELETE':
        return this.delete(url, { headers: httpHeaders });
      default:
        throw new Error(`Invalid HTTP method: ${route.method}`);
    }
  }
}
