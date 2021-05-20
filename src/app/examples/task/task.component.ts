import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from "../../global.service";
import { taskService } from '../../service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  public infoAlert : boolean = false;

  constructor(public _globalService: GlobalService, private modalService: NgbModal, public _taskService: taskService) {
    this._globalService.showLoading = true; 
   }


  ngOnInit(): void {
    this._globalService.currentViewTabs = true;

    var reqBody = {"pid" : Number(localStorage.getItem("pID"))} ;

    this._globalService.showLoading = true; 

    this._taskService.getTaskList(reqBody).subscribe(res=>{
      this._globalService.showLoading = false; 
        this._globalService.TaskList = res.results ; 
        console.log(this._globalService.TaskList );

        if(this._globalService.TaskList.length == 0){
          this._globalService.showAlert = true ;
          this._globalService.AlertMessage = "Start creating tasks to view them here";
        }

    }, err => {
      this._globalService.showLoading = false; 
      console.log(err.error);
      this._globalService.showAlert = true ;
      this._globalService.AlertMessage = "Could not retrieve previously created tasks...";
    });


  }

  //Open modal for task creation
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'task creation';
  }

  closeTask(iTask: any){
      var reqBody = { "tid" : Number(iTask) } ;

      this._globalService.showLoading = true; 
      
      this._taskService.removeTask(reqBody).subscribe(res=>{
        this._globalService.showLoading = false; 
        this._globalService.showAlert = true ;
        this._globalService.AlertMessage = res.message ;
        this.updateTaskList();

      }, err=>{
        this._globalService.showLoading = false; 
        this._globalService.showAlert = true ;
        this._globalService.AlertMessage = "Could not close task";
      });
  }


  updateTaskList(){

    var reqBody = {"pid" : Number(localStorage.getItem("pID"))} ;
    this._globalService.showLoading = true; 

      
    this._taskService.getTaskList(reqBody).subscribe(res=>{
      this._globalService.showLoading = false; 
        this._globalService.TaskList = res.results ; 

        if(this._globalService.TaskList.length == 0){
          this._globalService.showAlert = true ;
          this._globalService.AlertMessage = "Start creating tasks to view them here";
        }

    }, err => {
      this._globalService.showLoading = false; 
      console.log(err.error);
      this._globalService.showAlert = true ;
      this._globalService.AlertMessage = "Could not retrieve previously created tasks...";
    });
  }


  sortListByPrioriy(){
   this._globalService.TaskList.sort(this.comparePriority) ;
  }

  comparePriority(a, b) {
    const taskA = a.priority;
    const taskB = b.priority;
  
    let comparison = 0;
    if (taskA > taskB) {
      comparison = 1;
    } else if (taskA < taskB) {
      comparison = -1;
    }
    return comparison;
  }

  showInfoAlert(){
    this.infoAlert = true; 
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
           <span> <h6> Task Description </h6></span>
          </div>
        <input type="text" class="form-control" placeholder="Description" #des>

        <div class="typography-line" style="padding-left:10px;margin-top:10px">
            <h6> Task Priority </h6>
            <h6> (1: high priority - 4: low priority) </h6>
          </div>
        <input type="number" min="1" max="4" class="form-control" value="1" #pri>

      </form>
    </div>
  </div>
  <div class="modal-footer">
      <div class="left-side">
          <button type="button" class="btn btn-default btn-link" (click)="activeModal.close('Close click')">Cancel</button>
      </div>
      <div class="divider"></div>
      <div class="right-side">
          <button type="submit" class="btn btn-success btn-link" (click)="addTaskToList(des.value, pri.value , $event);activeModal.close('Close click') ">Create</button>
      </div>
  </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public _globalService: GlobalService, public _taskService: taskService, public activeModal: NgbActiveModal) {}

  addTaskToList(iDescription: any , iPriority: any , event: Event){
    
    var ReqBody = {"pid": Number(localStorage.getItem("pID")) , "desc": iDescription , "priority" : Number(iPriority) };


    this._globalService.showLoading = true; 
    this._taskService.createTask(ReqBody).subscribe(res =>{
      this._globalService.showLoading = false; 
      this._globalService.showAlert = true ;
      this._globalService.AlertMessage = res.message ;

      this.updateTaskList();
  

    }, err => {
      this._globalService.showLoading = false; 

    });

    

  }



  updateTaskList(){

    var reqBody = {"pid" : Number(localStorage.getItem("pID"))} ;
    this._globalService.showLoading = true; 

      
    this._taskService.getTaskList(reqBody).subscribe(res=>{
      this._globalService.showLoading = false; 
        this._globalService.TaskList = res.results ; 

        if(this._globalService.TaskList.length == 0){
          this._globalService.showAlert = true ;
          this._globalService.AlertMessage = "Start creating tasks to view them here";
        }

    }, err => {
      this._globalService.showLoading = false; 
      console.log(err.error);
      this._globalService.showAlert = true ;
      this._globalService.AlertMessage = "Could not retrieve previously created tasks...";
    });
  }


}