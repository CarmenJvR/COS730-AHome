import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class accountService
{
    constructor(private httpClient : HttpClient , private router: Router){}

    registerUser(PostData): Observable<any>{
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }) 
        };
        return this.httpClient.post('https://a-home.herokuapp.com/createAccount', PostData, options );
      }

    loginUser(PostData): Observable<any>{
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }) 
      };
      return this.httpClient.post('https://a-home.herokuapp.com/loginAccount', PostData, options );
    }
  

}