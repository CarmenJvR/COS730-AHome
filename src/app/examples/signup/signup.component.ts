import { Component, OnInit } from '@angular/core';
import { accountService } from '../../service/account.service';
import { Router } from '@angular/router';

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


    constructor( private router: Router, public _accountService: accountService ) { 
        this.userObj ={
            email: "",
            password: ""
        }
    }

    ngOnInit() {
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
        console.log(this.userObj);

        this._accountService.loginUser(this.userObj).subscribe(res => {
            console.log(res);
            

            if(res.message){
                this.alertMessage = res.message ;
                this.showAlert = true ;
            }else{
                localStorage.setItem("accessToken", res.accessToken) ;
                localStorage.setItem("ac", res.ac) ;
                this.router.navigate(["/project"]) ; 

            }

        },err =>{
            console.log(err.error);
        });
    }


    onRegister( ){
        this.showAlert = false ;
        console.log(this.userObj);

        this._accountService.registerUser(this.userObj).subscribe(res => {
            console.log(res);

            if(res.message){
                this.alertMessage = res.message ;
                this.showAlert = true ;
            }else{


                localStorage.setItem("accessToken", res.accessToken) ;
                localStorage.setItem("ac", res.ac) ;
                this.router.navigate(["/project"]) ; 
            }

        },err =>{
            console.log(err.error);
        });
    }

}
