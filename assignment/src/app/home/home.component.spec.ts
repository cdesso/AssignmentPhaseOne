import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
//   let routerSpy = {navigate: jasmine.createSpy('navigateByUrl')};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        // providers: [ { provide: Router, useValue: routerSpy} ],
        declarations: [ HomeComponent ],
        imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   it(`should route to login`, () => {

//     component.ngOnInit();

//     expect(routerSpy.navigate).toHaveBeenCalledWith('login')
//   });

    //Testing openChannelAdmin()
    it('openChannelAdmin() should return true', () => {
        component.channelAdmin = false;

        component.openChannelAdmin();

        expect(component.channelAdmin).toBeTrue();
    });
    it('openChannelAdmin() should return false', () => {
        component.channelAdmin = true;

        component.openChannelAdmin();

        expect(component.channelAdmin).toBeFalse();
    });

    //Testing openGroupAdmin()
    it('openGroupAdmin() should return true', () => {
        component.groupAdmin = false;

        component.openGroupAdmin();

        expect(component.groupAdmin).toBeTrue();
    });
    it('openGroupAdmin() should return false', () => {
        component.groupAdmin = true;

        component.openGroupAdmin();

        expect(component.groupAdmin).toBeFalse();
    });

    //Testing newUserForm()
    it('newUserForm() should return true', () => {
        component.userForm = false;

        component.newUserForm();

        expect(component.userForm).toBeTrue();
    });
    it('userForm() should return false', () => {
        component.userForm = true;

        component.newUserForm();

        expect(component.userForm).toBeFalse();
    });

});
