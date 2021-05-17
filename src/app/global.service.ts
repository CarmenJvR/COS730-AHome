import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface ProjectObj {
    id: number ;
    account_id: number;
    name: string;
    start_date: Date ;
    end_date: Date;
    budget_total: number;
  }


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private router: Router) { }

 //Alerts
  public showAlert : boolean = false; 
  public AlertMessage : string = ""; 

  //Project
  ProjectList : ProjectObj[] = new Array();
  public currentProject : string = "AHome" ; 

}