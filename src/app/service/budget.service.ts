import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class budgetService
{
    constructor(private httpClient : HttpClient , private router: Router){}

    createExpense(PostData): Observable<any>{
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }) 
        };
        return this.httpClient.post('https://a-home.herokuapp.com/createExpense', PostData, options );
      }

      getExpenses(PostData): Observable<any>{
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }) 
        };
        return this.httpClient.post('https://a-home.herokuapp.com/expenseList', PostData, options );
      }

      updateProjectBudget(PostData): Observable<any>{
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }) 
        };
        return this.httpClient.post('https://a-home.herokuapp.com/updateBudget', PostData, options );
      }

      removeExpense(PostData): Observable<any>{
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }) 
        };
        return this.httpClient.post('https://a-home.herokuapp.com/removeExpense', PostData, options );
      }

  

}