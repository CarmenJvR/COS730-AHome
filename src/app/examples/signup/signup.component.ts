import { Component, OnInit } from '@angular/core';

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

    constructor() { }

    ngOnInit() {
        this.login= true ;
        this.register = false ;
        this.guestLogin = false; 
    }

    flipView(){
        this.login = !this.login;
        this.register = !this.register;
    }
}
