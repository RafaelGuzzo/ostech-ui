import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class OrdemServicoService {

  endpoint: string = 'http://localhost:8080/api/v1/ordens-servico/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add Cliente
  AddCliente(data: Cliente): Observable<any> {
    return this.http.post(`${this.endpoint}`, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all Clientes
  GetClientes() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get Cliente
  GetCliente(id : Number): Observable<any> {
    let API_URL = `${this.endpoint}/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update Cliente
  UpdateCliente(id : Number, data : Cliente): Observable<any> {
    let API_URL = `${this.endpoint}/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Cliente
  DeleteCliente(id : Number): Observable<any> {
    var API_URL = `${this.endpoint}/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}