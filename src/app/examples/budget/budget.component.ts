import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from "../../global.service";
import { budgetService } from '../../service/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  public infoAlert : boolean = false; 

  constructor(private router: Router, public _budgetService: budgetService, private modalService: NgbModal, public _globalService : GlobalService) { }

  ngOnInit(): void {
    if(this._globalService.projectOpen == undefined){
      this.router.navigate(["/project"]) ;
    }

    var tempVal : number = 0 ;
    var req = {
      "pid": Number(localStorage.getItem("pID"))
    }

    this._globalService.showLoading = true;

    this._budgetService.getExpenses(req).subscribe(res =>{

      this._globalService.ExpenseList = res.results ; 

        if(this._globalService.ExpenseList.length == 0){
          this._globalService.showAlert = true ;
          this._globalService.AlertMessage = "Start adding expenses to manage your budget here...";
        }else{
          this._globalService.ExpenseMade = 0 ;
          for(var i = 0 ; i< this._globalService.ExpenseList.length ; i++){
            if(this._globalService.ExpenseList[i].status == "paid"){
              this._globalService.ExpenseMade += Number(this._globalService.ExpenseList[i].total) ;
            }
          }
          this._globalService.BudgetLeft = Number(this._globalService.projectOpen.budget_total) - Number(this._globalService.ExpenseMade);
        }

        this._globalService.showLoading = false; 

    }, err =>{
      this._globalService.showLoading = false; 
      console.log(err.error); 
    });


  }


  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'expense create';
  }

  showInfoAlert(){
    this.infoAlert = true; 
  }

  removeExpense(eid:any){
    var req = {
      "pid": Number(eid)
    }

    this._globalService.showLoading = true; 
    this._budgetService.removeExpense(req).subscribe(res =>{

      this._globalService.showAlert = true ; 
      this._globalService.AlertMessage = res.message ;

      this.updateExpenseList();

    }, err =>{
      this._globalService.showLoading = false; 
      console.log(err.error);
      this._globalService.showAlert = true ; 
      this._globalService.AlertMessage = "Could not remove expense" ;
    });
  }

  updateExpenseList(){
    var req = {
      "pid": Number(localStorage.getItem("pID"))
    }

    this._globalService.showLoading = true;

    this._budgetService.getExpenses(req).subscribe(res =>{
      this._globalService.showLoading = false; 
      this._globalService.ExpenseList = res.results ; 

        if(this._globalService.ExpenseList.length == 0){
          this._globalService.showAlert = true ;
          this._globalService.AlertMessage = "Start adding expenses to manage your budget here...";
        }else{
          this._globalService.ExpenseMade = 0 ;
          for(var i = 0 ; i< this._globalService.ExpenseList.length ; i++){
            this._globalService.ExpenseMade += Number(this._globalService.ExpenseList[i].total) ;
          }
          this._globalService.BudgetLeft = Number(this._globalService.projectOpen.budget_total) - Number(this._globalService.ExpenseMade);
          console.log(this._globalService.BudgetLeft);
        }

    }, err =>{
      this._globalService.showLoading = false; 
      console.log(err.error); 
    });
  }

}

@Component({
  selector: 'app-modal-content',
  template: `
  <div class="modal-header">
      <h5 class="modal-title text-center">Create Expense</h5>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
      </button>
  </div>
  <div class="modal-body">
    <div class="form-group">
      <form >

        <div class="typography-line" style="padding-left:10px;margin-bottom:10px">
           <span> <h6> Expense Description </h6></span>
          </div>
        <input type="text" class="form-control" placeholder="Description" #des>

        <div class="typography-line" style="padding-left:10px;margin-top:10px">
            <h6> Expense Cost </h6>
          </div>
        <input type="number" min="0.00" step=".01" class="form-control" value="1" #tt>

        <div class="typography-line" style="padding-left:10px;margin-top:10px">
            <h6> Expense Status </h6>
          </div>
        <select name="stat" #stat class="form-select form-select-lg mb-3" style="width:100%;" aria-label=".form-select-lg example">
          <option value="paid">Paid</option>
          <option value="pending">Pending payment</option>
        </select>

      </form>
    </div>
  </div>
  <div class="modal-footer">
      <div class="left-side">
          <button type="button" class="btn btn-default btn-link" (click)="activeModal.close('Close click')">Cancel</button>
      </div>
      <div class="divider"></div>
      <div class="right-side">
          <button type="submit" class="btn btn-success btn-link" (click)="addExpenseToList(des.value, tt.value, stat.value , $event);activeModal.close('Close click') ">Create</button>
      </div>
  </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public _globalService: GlobalService, public _budgetService: budgetService, public activeModal: NgbActiveModal) {}

  addExpenseToList(iDes: any, iTotal : any, iStat:any , event:Event){
      var req = {
        "pid": Number(localStorage.getItem("pID")),
        "description": iDes,
        "total": Number(iTotal),
        "status" : iStat 
      }

      this._globalService.showLoading = true; 
      this._budgetService.createExpense(req).subscribe(res=>{
        this._globalService.showLoading = false; 
        this._globalService.showAlert = true ;
        this._globalService.AlertMessage = res.message ;

        this.updateExpenseList();

      }, err =>{
        this._globalService.showLoading = false; 
        this._globalService.showAlert = true ;
      this._globalService.AlertMessage = "Could not retrieve expenses ...";

      });

  }


  updateExpenseList(){
    var req = {
      "pid": Number(localStorage.getItem("pID"))
    }

    this._globalService.showLoading = true;

    this._budgetService.getExpenses(req).subscribe(res =>{
      this._globalService.showLoading = false; 
      this._globalService.ExpenseList = res.results ; 

        if(this._globalService.ExpenseList.length == 0){
          this._globalService.showAlert = true ;
          this._globalService.AlertMessage = "Start adding expenses to manage your budget here...";
        }else{
          this._globalService.ExpenseMade = 0 ;
          for(var i = 0 ; i< this._globalService.ExpenseList.length ; i++){
            this._globalService.ExpenseMade += Number(this._globalService.ExpenseList[i].total) ;
          }

          this._globalService.BudgetLeft = Number(this._globalService.projectOpen.budget_total) - Number(this._globalService.ExpenseMade);
          console.log(this._globalService.BudgetLeft);
        }

    }, err =>{
      this._globalService.showLoading = false; 
      console.log(err.error); 
    });
  }


}
