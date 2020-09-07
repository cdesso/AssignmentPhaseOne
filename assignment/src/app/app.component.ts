import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GrifChat';

  constructor(private router: Router) { }

  logout(){
    // Log out function, check for login, if not exists, alert and do nothing, 
    // if exists, clear session storage, alert and logout
    if (localStorage.getItem('username')){
      localStorage.clear();
      alert('Successfully Logged out!');
      this.router.navigateByUrl('login');
    }
    else{
      alert('You are not logged in!')
    }
  }
}
