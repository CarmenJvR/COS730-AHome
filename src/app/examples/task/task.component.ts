import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

export interface TaskItem{
  Description: string;
  Priority : number ; 
}

export var TaskList : TaskItem[] = new Array(); 

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  TaskList = [ {"Description": "Call Tiler","Priority" :4},
  {"Description": "Get quote for bricks", "Priority" :2},
  {"Description": "Pay the Builder before Monday 09", "Priority" :1},
  {"Description": "Move debrie from site", "Priority" :3},
  {"Description": "Arrange meeting with Estate commitee", "Priority" :4},
  {"Description": "Organise cleaner to wash Kitchen", "Priority" :4},
  {"Description": "Get quote for wood floor paneling", "Priority" :2},
  {"Description": "Get quote for bricks", "Priority" :2},
  {"Description": "Get quote for bricks", "Priority" :1},
  {"Description": "Get quote for bricks", "Priority" :2},
  {"Description": "Get quote for bricks", "Priority" :3},
  ] ;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  //Open modal for task creation
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
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

  constructor(public activeModal: NgbActiveModal) {}

  addTaskToList(iDescription: any , iPriority: any , event: Event){
    TaskList.push( {"Description": iDescription, "Priority" : iPriority });
    console.log(TaskList);
  }


}