import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams   } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataContainerService {

  constructor(private http: HttpClient) { }

  getDetails(data) {
    var headers = new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Accept': 'application/pdf'
   });

   const options: {
    headers?: HttpHeaders,
    observe?: 'body',
    params?: HttpParams,
    reportProgress?: boolean,
    responseType: 'json',
    withCredentials?: boolean
} = {
    headers: headers,
    responseType: 'blob' as 'json'
};

    return this.http.post<any>("http://localhost:8080/pdfreport",data, options);

    
  }


}
