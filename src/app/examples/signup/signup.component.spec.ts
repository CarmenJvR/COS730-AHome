import { async, ComponentFixture, TestBed, tick, fakeAsync  } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { SignupComponent } from './signup.component';
import { HttpTestingController , HttpClientTestingModule } from '@angular/common/http/testing';
import { accountService } from '../../service/account.service';
import { AppComponent } from 'app/app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

class MockAccountService extends accountService {
  // mock everything used by the component
};

var test ={
  email: "test1@mail.com",
  password: "1234"
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let accService: accountService;
  let httpMock: HttpTestingController;
  let router: Router;
  let http: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]) , HttpClientTestingModule, AppModule],
      declarations: [ SignupComponent ],
      providers: [{
        provide: accountService,
        useClass: MockAccountService
      }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    accService = TestBed.get(accountService);
    router = TestBed.get(Router);
    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  }));


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Testing ngOnInit()', () => {
    component.ngOnInit();
    expect(component.login).toBe(true);
  });

  it('Testing loginUser()', () => {
    let accountSpy = spyOn(accService, 'loginUser').and.callThrough();
    let ans = accService.loginUser(test).pipe(
      map( res => res.body)
    );
    console.log(ans.operator);
    expect(accountSpy).toBeDefined();
    expect(accService.loginUser).toHaveBeenCalledWith(test);
  });

});
