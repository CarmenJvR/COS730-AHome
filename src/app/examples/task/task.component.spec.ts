import { ComponentFixture, TestBed , tick, fakeAsync} from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { AppModule } from '../../app.module';
import { HttpTestingController , HttpClientTestingModule } from '@angular/common/http/testing';
import { taskService } from '../../service/task.service';
import { AppComponent } from 'app/app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


class MockTaskService extends taskService {
  // mock everything used by the component
};

var test = {
    pid: 3 , 
    desc: "Karma project test" , 
    priority : 1
  };

  var test2 ={
    pid: 3
  }

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let tskService: taskService;
  let httpMock: HttpTestingController;
  let router: Router;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]) , HttpClientTestingModule, AppModule],
      declarations: [ TaskComponent ],
      providers: [{
        provide: taskService,
        useClass: MockTaskService
      }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tskService = TestBed.get(taskService);
    router = TestBed.get(Router);
    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });


  it('Successful creation of Task Component', () => {
    expect(component).toBeTruthy();
  });


  it('Testing ngOnInit()', () => {
    component.ngOnInit();
    expect(component.infoAlert).toBe(false);
    expect(component._globalService.currentViewTabs).toBe(true);
    expect(component._globalService.TaskList).toBeDefined();
  });

  it('Testing CreateTask()', () => {
    let taskSpy = spyOn(tskService, 'createTask').and.callThrough();
    let ans = tskService.createTask(test).pipe(
      map( res => res.body)
    );
    console.log(ans.operator);
    expect(taskSpy).toBeDefined();
    expect(tskService.createTask).toHaveBeenCalledWith(test);
    expect(component._globalService.TaskList).toBeDefined();
  });

  it('Testing GetTaskList()', () => {
    let taskSpy = spyOn(tskService, 'getTaskList').and.callThrough();
    let ans = tskService.getTaskList(test2).pipe(
      map( res => res.body)
    );
    console.log(ans.operator);
    expect(taskSpy).toBeDefined();
    expect(tskService.getTaskList).toHaveBeenCalledWith(test2);
    expect(component._globalService.TaskList).toBeDefined();
  });

  it('Testing Task Functionality', () => {
    expect(component.ngOnInit).toBeDefined();
    expect(component.closeTask).toBeTruthy();
    expect(component.open).toBeTruthy();
    expect(component.showInfoAlert).toBeTruthy();
    expect(component.updateTaskList).toBeTruthy();
    expect(component.sortListByPrioriy).toBeTruthy();
  });

  it('Testing Task Components', () => {
    expect(component.infoAlert).toBeDefined();
  });


});
