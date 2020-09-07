import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
//URL to allow server access
const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = localStorage.getItem('username');
  role = localStorage.getItem('role');
  userGroups = [];
  userChannels = [];
  JoinChannel = "";

  //Variables for user creation
  NewUsername = "";
  NewEmail = "";
  NewPassword = "";
  NewPassword2 = "";
  NewRole = "";

  UserError = "";
  EmailError = "";
  PasswordError = "";
  RoleError = "";

  //Variables for user deletion
  UsersArray=[];
  UserDelete = ""


  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    if (this.username == null){
      this.router.navigateByUrl('login');
    }
    this.findGroups(this.username);
  }

  newUser(){
    let newUser = {
      NewUsername: this.NewUsername,
      NewEmail: this.NewEmail,
      NewPassword: this.NewPassword, 
      NewPassword2: this.NewPassword2,
      NewRole: this.NewRole
    };
    this.httpClient.post(BACKEND_URL + '/userCreate', newUser, httpOptions).subscribe((data:any)=>{
      if (data.error){
        if (data.error == 'uNameLength'){
          this.UserError = "Username must be at least 4 characters long";
          this.EmailError = "";
          this.PasswordError = "";
          this.RoleError = "";
        }
        if (data.error == 'username'){
          this.UserError = "Username already taken";
          this.EmailError = "";
          this.PasswordError = "";
          this.RoleError = "";
        }
        if (data.error == 'emailLength'){
          this.UserError = "";
          this.EmailError = "Invalid email address length";
          this.PasswordError = "";
          this.RoleError = "";
        }
        if (data.error == 'password'){
          this.UserError = "";
          this.EmailError = "";
          this.PasswordError = "Passwords do not match";
          this.RoleError = "";
        }
        if (data.error == 'passwordLength'){
          this.UserError = "";
          this.EmailError = "";
          this.PasswordError = "Passwords must be longer than 5 characters";
          this.RoleError = "";
        }
        if (data.error == 'role'){
          this.UserError = "";
          this.EmailError = "";
          this.PasswordError = "";
          this.RoleError = "Please enter a role";
        }
      }
      else {
        this.NewUsername = "";
        this.NewEmail = "";
        this.NewPassword = "";
        this.NewPassword2 = "";
        this.NewRole = "";
        this.UserError = "";
        this.EmailError = "";
        this.PasswordError = "";
        this.RoleError = "";
        alert("User created");
        this.findUsers();
      }
    });
  }

  findUsers(){
    this.httpClient.post(BACKEND_URL + '/findUsers', httpOptions).subscribe((data:any)=>{
      if (this.UsersArray[0]){
        this.UsersArray = []
      } else {
        for (let i = 0; i < data.length; i++){
          if (data[i] == this.username){   continue;   }
          this.UsersArray.push({"username": data[i], "id": i});
        }
      }
      
    })
  }

  delUser(id){
    this.httpClient.post(BACKEND_URL + '/delUser', [id], httpOptions).subscribe((data:any)=>{
      this.UsersArray = []
      for (let i = 0; i < data.length; i++){
        this.UsersArray.push({"username": data[i], "id": i});
      }
    })
  }

  findGroups(username){
    this.httpClient.post(BACKEND_URL + '/findGroups', [username], httpOptions).subscribe((data:any)=>{
      this.userGroups = data
    })
  }

  findChannels(username, group){
    this.httpClient.post(BACKEND_URL + '/findChannels', [username, group], httpOptions).subscribe((data:any)=>{
      this.userChannels = data;
    })
  }

  joinChannel(){
    alert("Joining " + this.JoinChannel);
  }
}
