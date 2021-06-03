import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { BudgetComponent } from './budget.component';
import { AppModule } from '../../app.module';
import { HttpTestingController , HttpClientTestingModule } from '@angular/common/http/testing';
import { budgetService } from '../../service/budget.service';
import { AppComponent } from 'app/app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


class MockBudgetService extends budgetService {
  // mock everything used by the component
};


  var test1 ={
    pid: 3
  }

  var test2 = {
    "pid": 2,
    "description": "Testing expense creation",
    "total": 2 ,
    "status" : "pending" 
  }

  var test3 = {
    "status": "paid",
    "eid": 2
  }



describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let budService: budgetService;
  let httpMock: HttpTestingController;
  let router: Router;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]) , HttpClientTestingModule, AppModule],
      declarations: [ BudgetComponent ],
      providers: [{
        provide: budgetService,
        useClass: MockBudgetService
      }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    budService = TestBed.get(budgetService);
    router = TestBed.get(Router);
    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });


  it('Successful creation of Budget Component', () => {
    expect(component).toBeTruthy();
  });

  it('Testing ngOnInit()', () => {
    component.ngOnInit();
    expect(component.infoAlert).toBe(false);
    expect(component._globalService.ExpenseList).toBeDefined();
    expect(component._globalService.TaskList).toBeDefined();
    expect(component._globalService.BudgetLeft).toBeDefined();
  });

  it('Testing CreateExpense()', () => {
    let taskSpy = spyOn(budService, 'createExpense').and.callThrough();
    let ans = budService.createExpense(test2).pipe(
      map( res => res.body)
    );
    console.log(ans.operator);
    expect(taskSpy).toBeDefined();
    expect(budService.createExpense).toHaveBeenCalledWith(test2);
    expect(component._globalService.TaskList).toBeDefined();
  });

  it('Testing GetExpenses()', () => {
    let budSpy = spyOn(budService, 'getExpenses').and.callThrough();
    let ans = budService.getExpenses(test1).pipe(
      map( res => res.body)
    );
    console.log(ans.operator);
    expect(budSpy).toBeDefined();
    expect(budService.getExpenses).toHaveBeenCalledWith(test1);
    expect(component._globalService.TaskList).toBeDefined();
  });

  it('Testing UpdateExpense()', () => {
    let budSpy = spyOn(budService, 'updateExpense').and.callThrough();
    let ans = budService.updateExpense(test3).pipe(
      map( res => res.body)
    );
    console.log(ans.operator);
    expect(budSpy).toBeDefined();
    expect(budService.updateExpense).toHaveBeenCalledWith(test3);
    expect(component._globalService.TaskList).toBeDefined();
  });

  it('Testing Budget Functionality', () => {
    expect(component.ngOnInit).toBeDefined();
    expect(component.removeExpense).toBeTruthy();
    expect(component.open).toBeTruthy();
    expect(component.showInfoAlert).toBeTruthy();
    expect(component.updateExpenseList).toBeTruthy();
    expect(component.payExpense).toBeTruthy();
    expect(component.downloadPDF).toBeTruthy();
  });

  it('Testing Budget Components', () => {
    expect(component.infoAlert).toBeDefined();
  });
 
 


});
