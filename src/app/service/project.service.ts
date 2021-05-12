import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class projectService
{
    constructor(private httpClient : HttpClient , private router: Router){}

    createProject(PostData): Observable<any>{
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }) 
        };
        return this.httpClient.post('https://a-home.herokuapp.com/createProject', PostData, options );
      }

    getProjectList(PostData): Observable<any>{
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }) 
      };
      return this.httpClient.post('https://a-home.herokuapp.com/projectList', PostData, options );
    }
  

}