import { Component, OnInit, Input } from '@angular/core';
import { GlobalService, ScheduleObj } from "../../global.service";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { eventService } from '../../service/event.service';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public todayMonth : number = new Date().getMonth()+1;
  public timeFrame : string ;
  public showUpdateTime : boolean = false;

  public timeObj = {
    "pid": Number( localStorage.getItem("pID")),
    "start": new Date(this._globalService.projectOpen.start_date),
    "end" : new Date(this._globalService.projectOpen.end_date)
  }

  constructor(public _eventService: eventService, private modalService: NgbModal, public _globalService : GlobalService) { }

  ngOnInit(): void {
    var req = { pid : Number(localStorage.getItem("pID"))};
    this._globalService.activeYear = new Date().getFullYear();
    this.setTimeFrame();
    this.showUpdateTime = false ; 

    this._globalService.showLoading = true; 
    this._eventService.getSchedule(req).subscribe(res=>{
      this._globalService.ScheduleList = res.results ; 
      this.sortMonthList();
      this._globalService.showLoading = false; 

    }, err =>{
        console.log(err.error);
        this._globalService.showLoading = false; 
    }); 

  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'event create';
  }

  sortMonthList(){
        //clear months
        this._globalService.JanuaryList = [];
        this._globalService.FebruaryList = [];
        this._globalService.MarchList = [];
        this._globalService.AprilList = [];
        this._globalService.MayList = [];
        this._globalService.JuneList = [];
        this._globalService.JulyList = [];
        this._globalService.AugustList = [];
        this._globalService.SeptemberList = [];
        this._globalService.OctoberList = [];
        this._globalService.NovemberList = [];
        this._globalService.DecemberList = [];

        var emptyScheduleFlag = true ; 

    for(var i = 0 ; i < this._globalService.ScheduleList.length ; i++){
      var tempDate = new Date(this._globalService.ScheduleList[i].start_date) ;

      if(tempDate.getFullYear() == this._globalService.activeYear)
      {
        emptyScheduleFlag = false; 

          var tempObj = {
            id: this._globalService.ScheduleList[i].id ,
            start_date : tempDate.getDate().toString(),
            start_time : this._globalService.ScheduleList[i].start_time ,
            end_time : this._globalService.ScheduleList[i].end_time ,
            description : this._globalService.ScheduleList[i].description ,
          }

          

          switch(tempDate.getMonth()+1) {
            case 1:
              this._globalService.JanuaryList.push(tempObj);
              break;
            case 2:
              this._globalService.FebruaryList.push(tempObj);
              break;
              case 3:
                this._globalService.MarchList.push(tempObj);
              break;
              case 4:
                this._globalService.AprilList.push(tempObj);
              break;
              case 5:
                this._globalService.MayList.push(tempObj);
              break;
              case 6:
                this._globalService.JuneList.push(tempObj);
              break;
              case 7:
                this._globalService.JulyList.push(tempObj);
              break;
              case 8:
                this._globalService.AugustList.push(tempObj);
              break;
              case 9:
                this._globalService.SeptemberList.push(tempObj);
              break;
              case 10:
                this._globalService.OctoberList.push(tempObj);
              break;
              case 11:
                this._globalService.NovemberList.push(tempObj);
              break;
              case 12:
                this._globalService.DecemberList.push(tempObj);
              break;
            default:
              // code block
          }
      }
    }

    if(emptyScheduleFlag){
      this._globalService.AlertMessage = "No Scheduled Events for this Year";
      this._globalService.showAlert = true ;
    }

  }

  removeEvent(eid:any){
    var req = {"eid" : eid} ; 
    console.log(req);

    this._globalService.showLoading = true; 
    this._eventService.removeEvent(req).subscribe(res=>{
      this._globalService.showLoading = false; 
      this.updateSchedule();
      
      this._globalService.showAlert = true ;
      this._globalService.AlertMessage = res.message ;
      
      
    }, err=> {
      console.log(err.error);
      this._globalService.showLoading = false; 
    });

  }

  updateSchedule(){


    ///
    var req = { pid : Number(localStorage.getItem("pID"))};

    this._globalService.showLoading = true; 
    this._eventService.getSchedule(req).subscribe(res=>{
      this._globalService.ScheduleList = res.results ; 
      this.sortMonthList();
      this._globalService.showLoading = false; 

    }, err =>{
        console.log(err.error);
        this._globalService.showLoading = false; 
    }); 
  }

  nextYear(){
    this._globalService.showAlert = false ;
    this._globalService.activeYear++;
    this.sortMonthList();

  }

  previousYear(){
    this._globalService.showAlert = false ;
    this._globalService.activeYear--;
    this.sortMonthList();
  }

  setTimeFrame(){
    var start = new Date(this._globalService.projectOpen.start_date);
    var end = new Date(this._globalService.projectOpen.end_date);
    var sMon = start.getMonth() + 1;
    var eMon = end.getMonth() + 1 ; 
    this.timeFrame = start.getDate().toString() + "/" + sMon.toString() + "/"+ start.getFullYear().toString() + " - "+ end.getDate().toString() + "/" + eMon.toString() + "/"+ end.getFullYear().toString()  ;
  }

  updateTimeframe(){
    
    this._globalService.showLoading = true ;
    this._eventService.updateSchedule(this.timeObj).subscribe(res =>{
      
      this._globalService.AlertMessage = res.message;
      this._globalService.showAlert = true ;

      var start = new Date(this.timeObj.start);
      var end = new Date(this.timeObj.end);
      var sMon = start.getMonth() + 1;
      var eMon = end.getMonth() + 1 ; 
      this.timeFrame = start.getDate().toString() + "/" + sMon.toString() + "/"+ start.getFullYear().toString() + " - "+ end.getDate().toString() + "/" + eMon.toString() + "/"+ end.getFullYear().toString()  ;
      this.showUpdateTime = false ; 
      
      this._globalService.showLoading = false ;

    }, err =>{
      this._globalService.showLoading = false ;
      this._globalService.AlertMessage = "Failed to update project timeframe";
      this._globalService.showAlert = true ;
    });


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
            <h6> Date </h6>
        </div>
        <span>
        <input type="date"  #startD required >
        
        </span>

        <div class="typography-line" style="padding-left:10px;margin-top:10px">
            <h6> Time </h6>
        </div>
        <span>
           <input type="time"  #startT required >
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
          <input type="submit" class="btn btn-success btn-link" (click)="addEventToList(des.value, startD.value, startT.value , endT.value , $event);activeModal.close('Close click') " value="Create"/>
      </div>
  </div>
  `
})
export class NgbdModalContent {
  @Input() name;


  constructor(public _eventService: eventService, public activeModal: NgbActiveModal , public _globalService : GlobalService) {

  }

  addEventToList(iDes: any, iStartD: any, iStartT: any,  iEndT: any, event: Event){

      var req = {
        "pid": Number(localStorage.getItem("pID")),
        "desc" : iDes ,
        "startD": iStartD,
        "startT": iStartT,
        "endD" : iStartD,
        "endT": iEndT 
      }

      this._globalService.showLoading = true; 
    this._eventService.createEvent(req).subscribe(res=>{
      this._globalService.showLoading = false; 

      this._globalService.showAlert = true ;
      this._globalService.AlertMessage = res.message ;
      this.updateSchedule();
      
    }, err=> {
      console.log(err.error);
      this._globalService.showLoading = false; 
    });

      

  }

  sortMonthList(){
    //clear months
    this._globalService.JanuaryList = [];
    this._globalService.FebruaryList = [];
    this._globalService.MarchList = [];
    this._globalService.AprilList = [];
    this._globalService.MayList = [];
    this._globalService.JuneList = [];
    this._globalService.JulyList = [];
    this._globalService.AugustList = [];
    this._globalService.SeptemberList = [];
    this._globalService.OctoberList = [];
    this._globalService.NovemberList = [];
    this._globalService.DecemberList = [];

    var emptyScheduleFlag = true ; 

    for(var i = 0 ; i < this._globalService.ScheduleList.length ; i++){
      var tempDate = new Date(this._globalService.ScheduleList[i].start_date) ;

      if(tempDate.getFullYear() == this._globalService.activeYear)
      {
        emptyScheduleFlag = false ;
        var tempObj = {
          id: this._globalService.ScheduleList[i].id ,
          start_date : tempDate.getDate().toString(),
          start_time : this._globalService.ScheduleList[i].start_time ,
          end_time : this._globalService.ScheduleList[i].end_time ,
          description : this._globalService.ScheduleList[i].description ,
        }
  
        
  
        switch(tempDate.getMonth()+1) {
          case 1:
            this._globalService.JanuaryList.push(tempObj);
            break;
          case 2:
            this._globalService.FebruaryList.push(tempObj);
            break;
            case 3:
              this._globalService.MarchList.push(tempObj);
            break;
            case 4:
              this._globalService.AprilList.push(tempObj);
            break;
            case 5:
              this._globalService.MayList.push(tempObj);
            break;
            case 6:
              this._globalService.JuneList.push(tempObj);
            break;
            case 7:
              this._globalService.JulyList.push(tempObj);
            break;
            case 8:
              this._globalService.AugustList.push(tempObj);
            break;
            case 9:
              this._globalService.SeptemberList.push(tempObj);
            break;
            case 10:
              this._globalService.OctoberList.push(tempObj);
            break;
            case 11:
              this._globalService.NovemberList.push(tempObj);
            break;
            case 12:
              this._globalService.DecemberList.push(tempObj);
            break;
          default:
            // code block
        }

      }
     
    }

    if(emptyScheduleFlag){
      this._globalService.AlertMessage = "No Scheduled Events for this Year";
      this._globalService.showAlert = true ;
    }

  }

  updateSchedule(){


    ///
    var req = { pid : Number(localStorage.getItem("pID"))};

    this._globalService.showLoading = true; 
    this._eventService.getSchedule(req).subscribe(res=>{
      this._globalService.ScheduleList = res.results ; 
      this.sortMonthList();
      this._globalService.showLoading = false; 

    }, err =>{
        console.log(err.error);
        this._globalService.showLoading = false; 
    }); 
  }

}