import { Component, OnInit, Input } from '@angular/core';
import { projectService } from '../../service/project.service';
import { Router } from '@angular/router';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from "../../global.service";
import { accountService } from '../../service/account.service';

export interface ProjectObj {
  id: number ;
  account_id: number;
  name: string;
  start_date: Date ;
  end_date: Date;
  budget_total: number;
}

export interface ProjectCreateObj{
  ac: number;
  name: string;
  sd: Date ;
  ed: Date;
  budget: number;
}

export interface guestAddObj{
  pid: number,
  name: string,
  email: string 
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


   /** Variables */
  alertMessage : string = "No Projects Yet. Start creating projects to enjoy all features of AHome!" ; 
  showAlert : boolean = false; 
  ProjectList : ProjectObj[] = new Array();
  numberGuests : number = 0 ;
  showGuests : boolean = false; 
  showGuestsProject : string = '';
  showGuestsPID : number ; 
  toggleAddGuest : boolean = false; 
  guestToAdd : guestAddObj ; 

  constructor( public _accountService: accountService, public _globalService: GlobalService, private router: Router, public _projectService: projectService, private modalService: NgbModal ) { }

  ngOnInit(): void { 
    this.testValidAccess();
    this.toggleAddGuest = false; 
    this.showGuests = false; 
    this.numberGuests = 0 ;
    this.showAlert = false; 
    this.guestToAdd ={
      pid: 0 ,
      name:'',
      email:''
    }
    this._globalService.TaskList = [];
    this._globalService.VisualList = [];
    this._globalService.ExpenseList = [];
    this._globalService.currentProject = "AHome"; 
    localStorage.removeItem('pID') ;
    //Get ProjectList for owner || guest
    if(this._globalService.viewerType == "owner"){
      this.getOwnerProjects();
    }else if(this._globalService.viewerType == "guest"){
      this.getGuestProjects();
    }

  }

  testValidAccess(){
    if(this._globalService.viewerType == "owner" || this._globalService.viewerType == "" ){
      if(localStorage.getItem("accessToken")== undefined || localStorage.getItem("accessToken")== null || localStorage.getItem("accessToken")== ''){
        this.router.navigate(["/signup"]) ; 
      }
    }
  }

  getOwnerProjects(){
    this._globalService.showLoading = true ; 
    
    var reqObj = {ac: localStorage.getItem("ac")} ;

      this._projectService.getProjectList(reqObj).subscribe(res =>{
        this._globalService.showLoading = false; 
        this._globalService.ProjectList = res.results ; 

        if(this._globalService.ProjectList.length == 0){
          this._globalService.showAlert = true;
          this._globalService.AlertMessage = "No Projects Yet. Start creating projects to enjoy all features of AHome!" ; 
        }

        this._globalService.showAlert = this.showAlert; 

      } , err => {
        this._globalService.showLoading = false; 
          console.log(err.error);
      });
  }

  getGuestProjects(){
    this._globalService.showLoading = true ; 
    
    var reqObj = {gid: localStorage.getItem("gID")} ;

      this._projectService.getGuestProjectList(reqObj).subscribe(res =>{
        this._globalService.showLoading = false; 
        this._globalService.ProjectList = res.results ; 

        if(this._globalService.ProjectList.length == 0){
          this._globalService.showAlert = true;
          this._globalService.AlertMessage = "You are not the guest viewer for any project!" ; 
        }

        this._globalService.showAlert = this.showAlert; 

      } , err => {
        this._globalService.showLoading = false; 
          console.log(err.error);
      });
  }

  ionViewWillEnter(){
    this._globalService.currentViewTabs = false;
  }

  selectProject(proID : any, proName: any, proStart:any, proEnd:any, proBudget:any){
      console.log(proID);
      localStorage.setItem("pID",proID);
      this._globalService.currentProject = proName ; 
      this._globalService.projectOpen ={
        id : proID,
        account_id: Number(localStorage.getItem("ac")),
        name : proName,
        start_date: proStart,
        end_date: proEnd,
        budget_total: proBudget
      }
      

      if(this._globalService.viewerType == "owner"){
        this.router.navigate(["/task"]) ;
      }else{
        this.router.navigate(["/visual-board"]) ;
      }
  }


    //Open modal for task creation
    open() {
      const modalRef = this.modalService.open(NgbdModalContent);
      modalRef.componentInstance.name = 'TaskCreation';
    }

    //Guest Functionality
    viewGuests(projectId : any, projectName : any ){
      this.guestToAdd ={
        pid: 0 ,
        name:'',
        email:''
      }

      this.toggleAddGuest = false ; 
      this._globalService.showAlert = false ;
      this.numberGuests = 0 ;
      this.showGuests = false; 
      this.showGuestsProject = projectName ; 
      this.showGuestsPID = projectId ; 

      var reqBody = {"pid" : Number(projectId)} ;
  
      this._globalService.showLoading = true ;
      this._accountService.getGuestList(reqBody).subscribe(res=>{
        this._globalService.showLoading = false ;
        this._globalService.GuestList = res.results ;
        this.showGuests =true ; 

        this.numberGuests = this._globalService.GuestList.length;
        if(this._globalService.GuestList.length == 0){
          this._globalService.AlertMessage = 'No Guest Viewers Yet - Start adding guests to view your visual board';
          this._globalService.showAlert = true ;

        }
  
      }, err => {
        this._globalService.showLoading = false ;
        console.log(err.error);
      });
  
  
    }

    addGuest(  ){
        this.guestToAdd.pid = this.showGuestsPID;

        this._globalService.showLoading = true ;
        this._accountService.addGuest(this.guestToAdd).subscribe(res =>{
          this._globalService.showLoading = false ;
          this._globalService.AlertMessage = res.message ;
          this._globalService.showAlert = true ; 
          this.viewGuests(this.showGuestsPID, this.showGuestsProject);


        }, err =>{
          this._globalService.showLoading = false ;
          console.log(err.error);
          this._globalService.AlertMessage = "Could not add guest. Please try again later..." ;
          this._globalService.showAlert = true ; 
        });

    }

    removeGuest(gid: any){
      var reqBody = {"gid" : Number(gid)} ;
      
      this._globalService.showLoading = true ;
      this._accountService.removeGuest(reqBody).subscribe(res=>{
        this._globalService.showLoading = false ;
        this._globalService.AlertMessage = res.message ; 
        this._globalService.showAlert = true ;
        this.viewGuests(this.showGuestsPID, this.showGuestsProject);
  
      }, err => {
        this._globalService.showLoading = false ;
        console.log(err.error);
        this._globalService.AlertMessage = 'Failed to remove guest. PLease try again later' ; 
        this._globalService.showAlert = true ;
      });
  
    }


}


@Component({
  selector: 'app-modal-content',
  template: `
  <div class="modal-header">
      <h5 class="modal-title text-center">Create Task</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
      </button>
  </div>
  <div class="modal-body">
    <div class="form-group">
      <form >

        <div class="typography-line" style="padding-left:10px;margin-bottom:10px">
           <span> <h6> Project Name </h6></span>
          </div>
        <input type="text" class="form-control" placeholder="Example: My new project" #nam>

        <div class="typography-line" style="padding-left:10px;margin-bottom:10px">
           <span> <h6> Project Start Date </h6></span>
          </div>
        <input type="date" class="form-control" #sd>

        <div class="typography-line" style="padding-left:10px;margin-bottom:10px">
           <span> <h6> Project End Date </h6></span>
          </div>
        <input type="date" class="form-control" #ed>

        <div class="typography-line" style="padding-left:10px;margin-top:10px">
            <h6> Budget (R) </h6>
          </div>
        <input type="number" min="1"  class="form-control" value="1" #bud>

      </form>
    </div>
  </div>
  <div class="modal-footer">
      <div class="left-side">
          <button type="button" class="btn btn-default btn-link" (click)="activeModal.close('Close click')">Cancel</button>
      </div>
      <div class="divider"></div>
      <div class="right-side">
          <button type="submit" class="btn btn-success btn-link" (click)="createProject(nam.value, sd.value, ed.value,bud.value , $event);activeModal.close('Close click') ">Create</button>
      </div>
  </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public _globalService: GlobalService, public activeModal: NgbActiveModal, public _projectService: projectService) {}

  createProject(iName: any , isd: any, ied:any, ibudget , event: Event){
    //request object
    var PC: ProjectCreateObj = {
      ac : parseInt(localStorage.getItem("ac") ) ,
      name: iName,
      sd: isd ,
      ed: ied,
      budget: ibudget
    }

    //request
    this._globalService.showLoading = true;

    this._projectService.createProject(PC).subscribe(res =>{
      this._globalService.showLoading = false; 
        this._globalService.AlertMessage = res.message ; 
        this._globalService.showAlert = true ;


        this.updateListDisplay();
    }, err =>{
      this._globalService.showLoading = false; 
      console.log(err.error);
    });

  }

  updateListDisplay(){
    this._globalService.showLoading = true; 
    var reqObj = {ac: localStorage.getItem("ac")} ;
    this._projectService.getProjectList(reqObj).subscribe(res =>{
      this._globalService.showLoading = false; 
      this._globalService.ProjectList = res.results ; 


    } , err => {
      this._globalService.showLoading = false; 
        console.log(err.error);
    });
  }

}