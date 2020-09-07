import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('username') == null){
      this.router.navigateByUrl('login');
    }
  }

  logout(){
    alert(localStorage.getItem('username'));
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
