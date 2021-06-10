import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from "../../global.service";
import { visualService } from '../../service/visual.service';


@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent implements OnInit {

  

  constructor(private modalService: NgbModal, public _visualService: visualService , public _globalService : GlobalService) { }

  ngOnInit(): void {

    var reqBody = {"pid" : Number(localStorage.getItem("pID"))} ;
    this._globalService.showLoading = true ;

    this._visualService.getBoardList(reqBody).subscribe(res=>{
      this._globalService.showLoading = false ;
      this._globalService.VisualList = res.results ;

      if(this._globalService.VisualList.length == 0){
        this._globalService.showAlert = true ;
        this._globalService.AlertMessage = "Start uploading images to view your Visual Board here...";
      }

    },err => {

      this._globalService.showLoading = false ;
    });

  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'visual create';
  }

  removeImage(vid:any){
    var reqBody = {"pid": Number(vid)};

    this._globalService.showLoading = true ;
    this._visualService.removeBoard(reqBody).subscribe(res=>{
      this._globalService.showLoading = false ;
      this._globalService.showAlert = true ;
      this._globalService.AlertMessage = res.message ; 
      this.updateVisualList();

    },err =>{
      this._globalService.showLoading = false ;
      this._globalService.showAlert = true ;
      this._globalService.AlertMessage = "A problem occurred. Could not remove image";
    });

  }

  updateVisualList(){
    var reqBody = {"pid" : Number(localStorage.getItem("pID"))} ;
    this._globalService.showLoading = true ;

    this._visualService.getBoardList(reqBody).subscribe(res=>{
      this._globalService.showLoading = false ;
      this._globalService.VisualList = res.results ;

      if(this._globalService.VisualList.length == 0){
        this._globalService.showAlert = true ;
        this._globalService.AlertMessage = "Start uploading images to view your Visual Board here...";
      }

    },err => {

      this._globalService.showLoading = false ;
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
           <span> <h6> Image Description </h6></span>
          </div>
        <input type="text" class="form-control" placeholder="Description" #des>

        <div class="typography-line" style="padding-left:10px;margin-top:10px">
            <h6> Image  </h6>
          </div>
       
        <input class="form-control"  #f type="file" (change)="onFileSelected($event)" id="file-input"
                     accept="image/png, image/jpeg" #img>
      </form>
    </div>
  </div>
  <div class="modal-footer">
      <div class="left-side">
          <button type="button" class="btn btn-default btn-link" (click)="activeModal.close('Close click')">Cancel</button>
      </div>
      <div class="divider"></div>
      <div class="right-side">
          <button type="submit" class="btn btn-success btn-link" (click)="addVisualToList(des.value, img.value , $event);activeModal.close('Close click') ">Create</button>
      </div>
  </div>
  `
})
export class NgbdModalContent {
  @Input() name;
  base64textString : string;

  constructor(public activeModal: NgbActiveModal, public _visualService: visualService , public _globalService : GlobalService) {}

  addVisualToList(iDescription: any , iImage: any , event: Event ){
   
     var reqBody = {"pid":  Number(localStorage.getItem("pID")) , "name": iDescription , "image": this.base64textString };
     console.log(reqBody);
     
    this._globalService.showLoading = true ;
    this._visualService.createBoard(reqBody).subscribe(res =>{
      this._globalService.showLoading = false ;

      this._globalService.AlertMessage = res.message ;
      this._globalService.showAlert = true ; 

      this.updateVisualList();

    }, err =>{
      this._globalService.showLoading = false ;
      this._globalService.AlertMessage = "Failed to upload image. Please try again later" ;
      this._globalService.showAlert = true ; 

    });

    
    

  }


  onFileSelected(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //console.log(reader.result);
      let s = reader.result ; 
      me.base64textString = reader.result.toString() ;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  updateVisualList(){
    var reqBody = {"pid" : Number(localStorage.getItem("pID"))} ;
    this._globalService.showLoading = true ;

    this._visualService.getBoardList(reqBody).subscribe(res=>{
      this._globalService.showLoading = false ;
      this._globalService.VisualList = res.results ;

      if(this._globalService.VisualList.length == 0){
        this._globalService.showAlert = true ;
        this._globalService.AlertMessage = "Start uploading images to view your Visual Board here...";
      }

    },err => {

      this._globalService.showLoading = false ;
    });
  }

}
