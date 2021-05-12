import { Component, OnInit } from '@angular/core';
import { projectService } from '../../service/project.service';
import { Router } from '@angular/router';


export interface ProjectObj {
  id: number ;
  account_id: number;
  name: string;
  start_date: Date ;
  end_date: Date;
  budget_total: number;
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

  constructor(private router: Router, public _projectService: projectService ) { }

  ngOnInit(): void {

    var reqObj = {ac: localStorage.getItem("ac")} ;

      this._projectService.getProjectList(reqObj).subscribe(res =>{
        console.log(res);  
        this.ProjectList = res.results ;

        if(this.ProjectList.length == 0){
          this.showAlert = true;
        }

      } , err => {
          console.log(err.error);
      });
  }

  selectProject(proID : any){
      console.log(proID);
  }



}
