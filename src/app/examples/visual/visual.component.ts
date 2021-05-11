import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

export interface BoardItem{
  Description: string;
  Image : string; 
}

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent implements OnInit {

  VisualList =  [{"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
                {"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
                {"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
                {"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
                {"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
                {"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
                {"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
                {"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
                {"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
                {"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
                {"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
                {"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
                {"Description": "Some text here" , "Image": "../assets/img/rooftop.jpg" },
  ] ;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
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
          <button type="submit" class="btn btn-success btn-link" (click)="addTaskToList(des.value, img.value , $event);activeModal.close('Close click') ">Create</button>
      </div>
  </div>
  `
})
export class NgbdModalContent {
  @Input() name;
  base64textString : string;

  constructor(public activeModal: NgbActiveModal) {}

  addTaskToList(iDescription: any , iImage: any , event: Event){
    console.log("{Description:"+iDescription+", Image: "+ this.base64textString+"}");
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
  


      
      //console.log(me.diverObj.ProfilePhoto);s
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

}
