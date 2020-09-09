import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VirtualTimeScheduler } from 'rxjs';

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
  activeGroup = "";
  newGroupName = "";
  newInviteGroup = "";
  inviteForm = false;
  inviteUsers = [];

  //Variables for user creation
  NewUsername = "";
  NewEmail = "";
  NewPassword = "";
  NewPassword2 = "";
  NewRole = "U";

  UserError = "";
  EmailError = "";
  PasswordError = "";

  userForm = false;

  //Variables for user deletion
  UsersArray=[];
  UserDelete = ""


  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    if (this.username == null){
      this.router.navigateByUrl('login');
    }
    this.findGroups();
  }

  newUserForm(){
    if (!this.userForm){
      this.userForm = true;
      document.getElementById("userForm").style.display = "block";
    } else {
      this.userForm = false;
      document.getElementById("userForm").style.display = "none";
    }
  }

  addUser(){
    let newUser = {
      NewUsername: this.NewUsername,
      NewEmail: this.NewEmail,
      NewPassword: this.NewPassword, 
      NewPassword2: this.NewPassword2,
      NewRole: this.NewRole
    };
    this.httpClient.post(BACKEND_URL + '/addUser', newUser, httpOptions).subscribe((data:any)=>{
      if (data.error){
        if (data.error == 'uNameLength'){
          this.UserError = "Username must be at least 4 characters long";
          this.EmailError = "";
          this.PasswordError = "";
        }
        if (data.error == 'username'){
          this.UserError = "Username already taken";
          this.EmailError = "";
          this.PasswordError = "";
        }
        if (data.error == 'emailLength'){
          this.UserError = "";
          this.EmailError = "Invalid email address length";
          this.PasswordError = "";
        }
        if (data.error == 'password'){
          this.UserError = "";
          this.EmailError = "";
          this.PasswordError = "Passwords do not match";
        }
        if (data.error == 'passwordLength'){
          this.UserError = "";
          this.EmailError = "";
          this.PasswordError = "Passwords must be longer than 5 characters";
        }
      }
      else {
        this.NewUsername = "";
        this.NewEmail = "";
        this.NewPassword = "";
        this.NewPassword2 = "";
        this.NewRole = "U";
        this.UserError = "";
        this.EmailError = "";
        this.PasswordError = "";
        alert("User created");
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
        if (data[i] != this.username){
          this.UsersArray.push({"username": data[i], "id": i});
        }
      }
    })
  }

  findGroups(){
    this.httpClient.post(BACKEND_URL + '/findGroups', [this.username, this.role], httpOptions).subscribe((data:any)=>{
      this.userGroups = data
    })
  }

  findChannels(group){
    this.activeGroup = group;
    this.httpClient.post(BACKEND_URL + '/findChannels', [this.username, group, this.role], httpOptions).subscribe((data:any)=>{
      this.userChannels = data;
    })
    if (this.inviteForm == true){
      this.inviteForm = false;
      document.getElementById("newInviteGroup").style.display = "none";
    }
  }

  joinChannel(){
    alert("Joining " + this.JoinChannel);
  }

  addGroup(){
    this.httpClient.post(BACKEND_URL + '/addGroup', [this.username], httpOptions).subscribe((data:any)=>{
      // this.userChannels = data;
      if (data){
        this.findGroups();
      } else {
        alert("Error occured, group not added")
      }
    })
  }
  addChannel(){
    this.httpClient.post(BACKEND_URL + '/addChannel', [this.activeGroup], httpOptions).subscribe((data:any)=>{
      if (data){
        this.findChannels(this.activeGroup);
      } else {
        alert("Error occured, group not added")
      }
    })
  }

  renameGroup() {
    if (this.newGroupName == ""){
      document.getElementById("renameBox").style.display = "block";
    }
    else {
      document.getElementById("renameBox").style.display = "none";
      alert("Changing name of " + this.activeGroup + " to " + this.newGroupName);

      this.httpClient.post(BACKEND_URL + '/renameGroup', [this.activeGroup, this.newGroupName], httpOptions).subscribe((data:any)=>{
        if (data){
          this.findGroups()
        } else {
          alert("Error occured, invalid name")
        }
      })
      this.newGroupName = ""
    }
  }

  upgradeUser(id){
    this.httpClient.post(BACKEND_URL + '/upgradeUser', [id], httpOptions).subscribe((data:any)=>{
      if(!data){
        alert("User is already a super admin");
      } else {
        alert("done");
      }
    })
  }

  inviteGroup(group){
    if (!this.inviteForm){
      this.httpClient.post(BACKEND_URL + '/findInvite', [group], httpOptions).subscribe((data:any)=>{
        this.inviteUsers = data
      })
      this.inviteForm = true;
      document.getElementById("newInviteGroup").style.display = "block";
    }
    else {
      this.sendGroupInvite(this.newInviteGroup, this.activeGroup)
      this.inviteForm = false;
      document.getElementById("newInviteGroup").style.display = "none";
    }
  }

  sendGroupInvite(user, group){
    if (user != ""){
      this.httpClient.post(BACKEND_URL + '/sendGroupInvite', [user, group], httpOptions).subscribe((data:any)=>{
        if (data){
          alert(user + " added to " + group)
        }
      })
    }
  }

}
