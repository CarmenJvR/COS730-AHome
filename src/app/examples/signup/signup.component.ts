import { Component, OnInit } from '@angular/core';
import { accountService } from '../../service/account.service';
import { Router } from '@angular/router';
import { GlobalService } from "../../global.service";

export interface User {
    email: string;
    password : string ;
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;

    /** Variables */
    login : boolean ;
    register : boolean ;
    guestLogin : boolean; 
    userObj: User;
    alertMessage : string = "No Message" ; 
    showAlert : boolean = false; 


    constructor(public _globalService: GlobalService, private router: Router, public _accountService: accountService ) { 
        this.userObj ={
            email: "",
            password: ""
        }
    }

    ngOnInit() {
        this._globalService.currentProject = "AHome";
        this._globalService.currentViewTabs = false;
        this.login= true ;
        this.register = false ;
        this.guestLogin = false; 

        localStorage.removeItem('accessToken') ;
        localStorage.removeItem('ac') ;
        localStorage.removeItem('pID') ;
        localStorage.removeItem('alert') ;
    }

    ionViewWillEnter(){
        this._globalService.currentProject = "AHome";
        this._globalService.currentViewTabs = false;
        this.login= true ;
        this.register = false ;
        this.guestLogin = false;
    }

    flipView(){
        this.login = !this.login;
        this.register = !this.register;
    }

    onLogin( ){
        this.showAlert = false ;
        
        this._globalService.showLoading = true;
        this._accountService.loginUser(this.userObj).subscribe(res => {
           
            this._globalService.showLoading = false;

            if(res.message){
                this.alertMessage = res.message ;
                this.showAlert = true ;
            }else{
                localStorage.setItem("accessToken", res.accessToken) ;
                localStorage.setItem("ac", res.ac) ;
                this.router.navigate(["/project"]) ; 

            }

        },err =>{
            this._globalService.showLoading = false;
            console.log(err.error);
        });
    }


    onRegister( ){
        this.showAlert = false ;
        
        this._globalService.showLoading = true;
        this._accountService.registerUser(this.userObj).subscribe(res => {
            
            this._globalService.showLoading = false;
            if(res.message){
                this.alertMessage = res.message ;
                this.showAlert = true ;
            }else{


                localStorage.setItem("accessToken", res.accessToken) ;
                localStorage.setItem("ac", res.ac) ;
                this.router.navigate(["/project"]) ; 
            }

        },err =>{
            this._globalService.showLoading = false;
            console.log(err.error);
        });
    }

}
