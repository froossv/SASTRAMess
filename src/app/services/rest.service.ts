import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';

import { User,Response } from './classes';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(public httpClient : HttpClient) { }

  baseUrl:string = "https://sastramess.herokuapp.com/";
  user = new User();

  private handleError(err: HttpErrorResponse){
      console.error(err);
      return throwError('Something bad happened; please try again later.');
  }

  public userAuth(regnum,pwd): Observable<Response>{
      this.user.username = regnum;
      this.user.password = pwd;
      this.user.hostel = '';
      console.log(this.user);
      return this.httpClient
      .post(this.baseUrl +'users',this.user).pipe(
      map(response => {
          console.log(response);
          return new Response(response);
      }),
      catchError(this.handleError));
  }
}
