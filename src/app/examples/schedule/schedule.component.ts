import { Component, OnInit, Input } from '@angular/core';
import { GlobalService, ScheduleObj } from "../../global.service";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {


 

  constructor(private modalService: NgbModal, public _globalService : GlobalService) { }

  ngOnInit(): void {

  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'event create';
  }

}


@Component({
  selector: 'app-modal-content',
  template: `
  <div class="modal-header">
      <h5 class="modal-title text-center">Upload Image</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
      </button>
  </div>
  <div class="modal-body">
    <div class="form-group">
      <form >

        <div class="typography-line" style="padding-left:10px;margin-bottom:10px">
           <span> <h6> Event Description </h6></span>
          </div>
        <input type="text" class="form-control" placeholder="Description" #des required> 

        <div class="typography-line" style="padding-left:10px;margin-top:10px">
            <h6> Start </h6>
        </div>
        <span>
        <input type="date"  #startD required >
        <input type="time"  #startT required >
        </span>

        <div class="typography-line" style="padding-left:10px;margin-top:10px">
            <h6> End Time </h6>
        </div>
        <span>
           <input type="date"   #endD required >
           <input type="time"   #endT required >
        </span>


      </form>
    </div>
  </div>
  <div class="modal-footer">
      <div class="left-side">
          <button type="button" class="btn btn-default btn-link" (click)="activeModal.close('Close click')">Cancel</button>
      </div>
      <div class="divider"></div>
      <div class="right-side">
          <input type="submit" class="btn btn-success btn-link" (click)="addEventToList(des.value, startD.value, startT.value, endD.value , endT.value , $event);activeModal.close('Close click') " value="Create"/>
      </div>
  </div>
  `
})
export class NgbdModalContent {
  @Input() name;


  constructor(public activeModal: NgbActiveModal , public _globalService : GlobalService) {

  }

  addEventToList(iDes: any, iStartD: any, iStartT: any, iEndD: any, iEndT: any, event: Event){

      var req = {
        "id": Number(localStorage.getItem("pID")),
        "description" : iDes ,
        "start_date": iStartD,
        "start_time": iStartT,
        "end_date" : iEndD,
        "end_time": iEndT 
      }

      this._globalService.ScheduleList.push(req);
      var tempDate = new Date(iStartD);
      req.start_date = tempDate.getDay() ;

      switch(tempDate.getMonth()+1) {
        case 1:
          this._globalService.JanuaryList.push(req);
          break;
        case 2:
          this._globalService.FebruaryList.push(req);
          break;
          case 3:
            this._globalService.MarchList.push(req);
          break;
          case 4:
            this._globalService.AprilList.push(req);
          break;
          case 5:
            this._globalService.MayList.push(req);
          break;
          case 6:
            this._globalService.JuneList.push(req);
          break;
          case 7:
            this._globalService.JulyList.push(req);
          break;
          case 8:
            this._globalService.AugustList.push(req);
          break;
          case 9:
            this._globalService.SeptemberList.push(req);
          break;
          case 10:
            this._globalService.OctoberList.push(req);
          break;
          case 11:
            this._globalService.NovemberList.push(req);
          break;
          case 12:
            this._globalService.DecemberList.push(req);
          break;
        default:
          // code block
      }

      

  }


}