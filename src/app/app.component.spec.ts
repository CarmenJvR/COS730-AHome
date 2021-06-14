import { TestBed,  fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {Location} from "@angular/common";
import {Router} from "@angular/router";


describe('AppComponent', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);

  });

  it('should create the app', async() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be able to navigate to `/`', fakeAsync(() => {
    router.navigate(['/']).then(() => {
        expect(router.url).toEqual('/');
      });
  }));

  it('navagate to `signup` redirects to `/signup`', fakeAsync(() => {
    let navigateSpy = spyOn(router, 'navigate');
    router.navigate(['/signup']);
    expect(navigateSpy).toHaveBeenCalledWith(['/signup']);
  }));

  it('navagate to `task` redirects to `/task`', fakeAsync(() => {
    let navigateSpy = spyOn(router, 'navigate');
    router.navigate(['/task']);
    expect(navigateSpy).toHaveBeenCalledWith(['/task']);
  }));

  it('navagate to `budget` redirects to `/budget`', fakeAsync(() => {
    let navigateSpy = spyOn(router, 'navigate');
    router.navigate(['/budget']);
    expect(navigateSpy).toHaveBeenCalledWith(['/budget']);
  }));

  it('navagate to `project` redirects to `/project`', fakeAsync(() => {
    let navigateSpy = spyOn(router, 'navigate');
    router.navigate(['/project']);
    expect(navigateSpy).toHaveBeenCalledWith(['/project']);
  }));

  it('navagate to `visual-board` redirects to `/visual-board`', fakeAsync(() => {
    let navigateSpy = spyOn(router, 'navigate');
    router.navigate(['/visual-board']);
    expect(navigateSpy).toHaveBeenCalledWith(['/visual-board']);
  }));

  it('navagate to `schedule` redirects to `/schedule`', fakeAsync(() => {
    let navigateSpy = spyOn(router, 'navigate');
    router.navigate(['/schedule']);
    expect(navigateSpy).toHaveBeenCalledWith(['/schedule']);
  }));

    

});
