import { ComponentFixture, TestBed , tick, fakeAsync } from '@angular/core/testing';
import { ProjectComponent } from './project.component';
import { AppModule } from '../../app.module';
import { HttpTestingController , HttpClientTestingModule } from '@angular/common/http/testing';
import { projectService } from '../../service/project.service';
import { AppComponent } from 'app/app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

var test ={
  ac: 1,
  name: "KarmaTest",
  sd: '2020-06-06' ,
  ed: '2020-06-07',
  budget: 1000
}

var test2 ={
  ac: 1
}

class MockProjectService extends projectService {
  // mock everything used by the component
};

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let projService: projectService;
  let httpMock: HttpTestingController;
  let router: Router;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]) , HttpClientTestingModule, AppModule],
      declarations: [ ProjectComponent ],
      providers: [{
        provide: projectService,
        useClass: MockProjectService
      }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    projService = TestBed.get(projectService);
    router = TestBed.get(Router);
    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Testing ngOnInit()', () => {
    component.ngOnInit();
    expect(component.showAlert).toBe(false);
  });

  it('Testing CreateProject()', () => {
    let accountSpy = spyOn(projService, 'createProject').and.callThrough();
    let ans = projService.createProject(test).pipe(
      map( res => res.body)
    );
    console.log(ans.operator);
    expect(accountSpy).toBeDefined();
    expect(projService.createProject).toHaveBeenCalledWith(test);
  });

  it('Testing ProjectList()', () => {
    let accountSpy = spyOn(projService, 'getProjectList').and.callThrough();
    let ans = projService.getProjectList(test2).pipe(
      map( res => res.body)
    );
    console.log(ans.operator);
    expect(accountSpy).toBeDefined();
    expect(projService.getProjectList).toHaveBeenCalledWith(test2);
  });


  it('Testing Project Functionality', () => {
    expect(component.ngOnInit).toBeDefined();
    expect(component.selectProject).toBeTruthy();
    expect(component.open).toBeTruthy();
  });

});
