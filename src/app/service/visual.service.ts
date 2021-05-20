import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class visualService
{
    constructor(private httpClient : HttpClient , private router: Router){}

    createBoard(PostData): Observable<any>{
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }) 
        };
        return this.httpClient.post('https://a-home.herokuapp.com/createBoard', PostData, options );
      }

    getBoardList(PostData): Observable<any>{
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }) 
      };
      return this.httpClient.post('https://a-home.herokuapp.com/boardList', PostData, options );
    }
  

}