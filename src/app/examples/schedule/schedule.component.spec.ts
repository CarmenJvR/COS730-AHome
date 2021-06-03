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
var d = new Date();
  var test2 ={
    "pid": 3,
    "desc" : "test event" ,
    "startD":d ,
    "startT": d,
    "endD" : d,
    "endT": d 
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

  it('Testing ngOnInit()', () => {
    component.ngOnInit();
    expect(component._globalService.ScheduleList).toBeDefined();
    expect(component._globalService.TaskList).toBeDefined();
    expect(component._globalService.JanuaryList).toBeDefined();
    expect(component._globalService.FebruaryList).toBeDefined();
    expect(component._globalService.MarchList).toBeDefined();
    expect(component._globalService.AprilList).toBeDefined();
    expect(component._globalService.JuneList).toBeDefined();
    expect(component._globalService.JulyList).toBeDefined();
    expect(component._globalService.AugustList).toBeDefined();
    expect(component._globalService.SeptemberList).toBeDefined();
    expect(component._globalService.OctoberList).toBeDefined();
    expect(component._globalService.NovemberList).toBeDefined();
    expect(component._globalService.DecemberList).toBeDefined();
  });

  it('Testing Schedule Functionality', () => {
    expect(component.ngOnInit).toBeDefined();
    expect(component.open).toBeTruthy();
    expect(component.sortMonthList).toBeTruthy();
    expect(component.removeEvent).toBeTruthy();
    expect(component.updateSchedule).toBeTruthy();
  });

  it('Testing Schedule Components', () => {
    expect(component.todayMonth).toBeDefined();
  });

  it('Testing GetSchedule()', () => {
    let eventSpy = spyOn(evtService, 'getSchedule').and.callThrough();
    let ans = evtService.getSchedule(test1).pipe(
      map( res => res.body)
    );
    console.log(ans.operator);
    expect(eventSpy).toBeDefined();
    expect(evtService.getSchedule).toHaveBeenCalledWith(test1);
    expect(component._globalService.TaskList).toBeDefined();
  });

  it('Testing CreateEvent()', () => {
    let eventSpy = spyOn(evtService, 'createEvent').and.callThrough();
    let ans = evtService.createEvent(test2).pipe(
      map( res => res.body)
    );
    console.log(ans.operator);
    expect(eventSpy).toBeDefined();
    expect(evtService.createEvent).toHaveBeenCalledWith(test2);
    expect(component._globalService.TaskList).toBeDefined();
  });

  it('Testing SortMonthList()', () => {
    component.sortMonthList();
    expect(component._globalService.ScheduleList).toBeDefined();
    expect(component._globalService.TaskList).toBeDefined();
    expect(component._globalService.JanuaryList).toBeDefined();
    expect(component._globalService.FebruaryList).toBeDefined();
    expect(component._globalService.MarchList).toBeDefined();
    expect(component._globalService.AprilList).toBeDefined();
    expect(component._globalService.JuneList).toBeDefined();
    expect(component._globalService.JulyList).toBeDefined();
    expect(component._globalService.AugustList).toBeDefined();
    expect(component._globalService.SeptemberList).toBeDefined();
    expect(component._globalService.OctoberList).toBeDefined();
    expect(component._globalService.NovemberList).toBeDefined();
    expect(component._globalService.DecemberList).toBeDefined();
  });

  

});
