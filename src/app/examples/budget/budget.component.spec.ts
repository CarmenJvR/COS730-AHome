import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { BudgetComponent } from './budget.component';
import { AppModule } from '../../app.module';
import { HttpTestingController , HttpClientTestingModule } from '@angular/common/http/testing';
import { budgetService } from '../../service/budget.service';
import { GlobalService } from '../../global.service';
import { AppComponent } from 'app/app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


class MockBudgetService extends budgetService {
  // mock everything used by the component
};


  var test ={
    pid: 3
  }


describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let budService: budgetService;
  let _globalService: GlobalService;
  let httpMock: HttpTestingController;
  let router: Router;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]) , HttpClientTestingModule, AppModule],
      declarations: [ BudgetComponent ],
      providers: [{
        provide: [budgetService, GlobalService],
        useClass: MockBudgetService
      }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    budService = TestBed.get(budgetService);
    _globalService = TestBed.get(GlobalService);
    router = TestBed.get(Router);
    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });


  it('Successful creation of Budget Component', () => {
    expect(component).toBeTruthy();
  });

 


});
