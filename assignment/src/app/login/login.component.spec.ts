import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { LoginComponent } from './login.component';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call alert "You are already logged in!"`, () => {
    sessionStorage.setItem('username', 'Super');
    spyOn(window, "alert");
    
    component.ngOnInit();

    expect(window.alert).toHaveBeenCalledWith('You are already logged in');
  });

  it(`should define error as "Invalid username or password`, () => {
    
    
    component.submit();

    expect(component.error).toBe('Invalid username or password')
  });

  it(`should define error as "Invalid username or password`, () => {
    component.username = 'super';
    component.password = 'admin';
    
    component.submit();

    expect(component.error).toBe('')
  });
});
