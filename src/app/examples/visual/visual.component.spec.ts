import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { VisualComponent } from './visual.component';
import { AppModule } from '../../app.module';
import { HttpTestingController , HttpClientTestingModule } from '@angular/common/http/testing';
import { visualService } from '../../service/visual.service';
import { AppComponent } from 'app/app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


class MockVisualService extends visualService {
  // mock everything used by the component
};

var test1 ={
  pid: 3
}


describe('VisualComponent', () => {
  let component: VisualComponent;
  let fixture: ComponentFixture<VisualComponent>;
  let visService: visualService;
  let httpMock: HttpTestingController;
  let router: Router;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]) , HttpClientTestingModule, AppModule],
      declarations: [ VisualComponent ],
      providers: [{
        provide: visualService,
        useClass: MockVisualService
      }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(VisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    visService = TestBed.get(visualService);
    router = TestBed.get(Router);
    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });

  it('Successful creation of Visual Component', () => {
    expect(component).toBeTruthy();
  });

  it('Testing ngOnInit()', () => {
    component.ngOnInit();
    expect(component._globalService.VisualList).toBeDefined();
  });

  it('Testing GetBoardList()', () => {
    let visSpy = spyOn(visService, 'getBoardList').and.callThrough();
    let ans = visService.getBoardList(test1).pipe(
      map( res => res.body)
    );
    console.log(ans.operator);
    expect(visSpy).toBeDefined();
    expect(visService.getBoardList).toHaveBeenCalledWith(test1);
    expect(component._globalService.TaskList).toBeDefined();
  });

  it('Testing Visual Functionality', () => {
    expect(component.ngOnInit).toBeDefined();
    expect(component.open).toBeTruthy();
  });


});
