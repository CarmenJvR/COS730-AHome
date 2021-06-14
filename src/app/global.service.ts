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

  export interface ScheduleObj2{
    id: number ;
    start_date : string;
    start_time : Time ;
    end_time : Time ;
    description : string ; 
  }

  export interface GuestObj{
    id: number ; 
    project_id: number ;
    name: string;
    email: string ; 
  }
  


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private router: Router) { }

  //navigation
  public currentViewTabs : boolean = false;
  public showLoading : boolean = false;
  public viewerType : string ='' ;
  public toggleLogin : boolean = false;

 //Alerts
  public showAlert : boolean = false; 
  public AlertMessage : string = ""; 

  //Project
  ProjectList : ProjectObj[] = new Array();
  public currentProject : string = "AHome" ; 
  private d = new Date() ;
  public projectOpen : ProjectObj = {
    id: 1,
    account_id: 1,
    name: "Placeholder", 
    start_date: this.d , 
    end_date: this.d,
    budget_total: 0
  }

  //Task
  public TaskList : TaskObj[] = new Array(); 


  //Visual
  public VisualList : BoardObj[] = new Array();
  public GuestList : GuestObj[] = new Array() ; 

  //Expense
  public ExpenseList : ExpenseObj[] = new Array();
  public ExpenseMade : number = 0 ;
  public BudgetLeft: number = 0 ;

  //schedule
  public ScheduleList : ScheduleObj[] = new Array(); 
  public activeYear : number = new Date().getFullYear(); 

  public JanuaryList : ScheduleObj2[] = new Array(); 
  public FebruaryList : ScheduleObj2[] = new Array();
  public MarchList : ScheduleObj2[] = new Array();
  public AprilList : ScheduleObj2[] = new Array();
  public MayList : ScheduleObj2[] = new Array();
  public JuneList : ScheduleObj2[] = new Array();
  public JulyList : ScheduleObj2[] = new Array();
  public AugustList : ScheduleObj2[] = new Array();
  public SeptemberList : ScheduleObj2[] = new Array();
  public OctoberList : ScheduleObj2[] = new Array();
  public NovemberList : ScheduleObj2[] = new Array();
  public DecemberList : ScheduleObj2[] = new Array();

}