import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ScheduleComponent } from './schedule.component';
import { AppModule } from '../../app.module';
import { HttpTestingController , HttpClientTestingModule } from '@angular/common/http/testing';
import { eventService } from '../../service/event.service';
import { AppComponent } from 'app/app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

class MockEventService extends eventService {
  // mock everything used by the component
};


  var test1 ={
    pid: 3
  }

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;
  let evtService: eventService;
  let httpMock: HttpTestingController;
  let router: Router;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]) , HttpClientTestingModule, AppModule],
      declarations: [ ScheduleComponent ],
      providers: [{
        provide: eventService,
        useClass: MockEventService
      }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    evtService = TestBed.get(eventService);
    router = TestBed.get(Router);
    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });



  it('Successful creation of Schedule Component', () => {
    expect(component).toBeTruthy();
  });
});
