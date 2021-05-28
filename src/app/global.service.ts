import { Time } from '@angular/common';
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

  export interface TaskObj{
    ID : number ;
    description: string;
    priority : number ; 
  }

  export interface BoardObj{
    id: number ;
    name: string;
    image : string; 
  }

  export interface ExpenseObj{
    id: number ;
    description: string;
    total: number;
    status: string ;
  }

  export interface ScheduleObj{
    id: number ;
    start_date : Date;
    end_date : Date ;
    start_time : Time ;
    end_time : Time ;
    description : string ; 
  }
  


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private router: Router) { }

  //navigation
  public currentViewTabs : boolean = false;
  public showLoading : boolean = false;

 //Alerts
  public showAlert : boolean = false; 
  public AlertMessage : string = ""; 

  //Project
  ProjectList : ProjectObj[] = new Array();
  public currentProject : string = "AHome" ; 
  public projectOpen : ProjectObj ; 

  //Task
  public TaskList : TaskObj[] = new Array(); 


  //Visual
  public VisualList : BoardObj[] = new Array();

  //Expense
  public ExpenseList : ExpenseObj[] = new Array();
  public ExpenseMade : number = 0 ;
  public BudgetLeft: number = 0 ;

  //schedule
  public ScheduleList : ScheduleObj[] = new Array(); 
  
  public JanuaryList : ScheduleObj[] = new Array(); 
  public FebruaryList : ScheduleObj[] = new Array();
  public MarchList : ScheduleObj[] = new Array();
  public AprilList : ScheduleObj[] = new Array();
  public MayList : ScheduleObj[] = new Array();
  public JuneList : ScheduleObj[] = new Array();
  public JulyList : ScheduleObj[] = new Array();
  public AugustList : ScheduleObj[] = new Array();
  public SeptemberList : ScheduleObj[] = new Array();
  public OctoberList : ScheduleObj[] = new Array();
  public NovemberList : ScheduleObj[] = new Array();
  public DecemberList : ScheduleObj[] = new Array();

}