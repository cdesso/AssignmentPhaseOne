import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    sessionStorage.clear();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
 
  it(`should have as title 'GrifChat'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('GrifChat');
  });

  it(`should call alert "You are not logged in!"`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(window, "alert");

    app.logout();

    expect(window.alert).toHaveBeenCalledWith('You are not logged in!');
  });

  it(`should call alert "Successfully Logged out!"`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    sessionStorage.setItem('username', 'Super');
    spyOn(window, "alert");
    
    app.logout();

    expect(window.alert).toHaveBeenCalledWith('Successfully Logged out!');
  });
});
