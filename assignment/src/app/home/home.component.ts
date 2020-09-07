import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = localStorage.getItem('username');
  role = localStorage.getItem('role');

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.username == null){
      this.router.navigateByUrl('login');
    }
  }
}
