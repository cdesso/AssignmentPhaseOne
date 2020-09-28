import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedDataService } from '../services/shared-data.service'

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
  username = sessionStorage.getItem('username');
  role = sessionStorage.getItem('role');
  userGroups = [];
  userChannels = [];
  JoinChannel = "";
  activeGroup = "";
  newGroupName = "";
  newInviteGroup = "";
  inviteForm = false;
  inviteUsers = [];

  newDeleteFromGroup = "";
  deleteFromGroupForm = false;
  deleteUsersFromGroup = [];

  newInviteChannel = "";
  inviteChannelForm = false;
  inviteChannelUsers = [];

  newDeleteFromChannel = "";
  deleteFromChannelForm = false;
  deleteUsersFromChannel = [];

  renameGroupForm = false;

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


  constructor(private router: Router, private httpClient: HttpClient, private shared: SharedDataService) { }

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
        if (data.error == 'db'){
          alert("Error inserting data, user not created.")
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
    this.JoinChannel = '';
    this.activeGroup = group;
    this.httpClient.post(BACKEND_URL + '/findChannels', [this.username, group, this.role], httpOptions).subscribe((data:any)=>{
      this.userChannels = data;
    })
    if (this.inviteForm == true){
      this.inviteForm = false;
      this.newInviteGroup = "";
      document.getElementById("newInviteGroup").style.display = "none";
      document.getElementById("newInviteGroup2").style.display = "none";
    }
    else if (this.deleteFromGroupForm == true){
      this.deleteFromGroupForm = false;
      this.newDeleteFromGroup = "";
      document.getElementById("deleteUserGroup").style.display = "none";
      document.getElementById("deleteUserGroup2").style.display = "none";
    }
    else if (this.renameGroupForm == true){
      this.newGroupName = "";
      this.renameGroupForm = false;
      document.getElementById("renameBox").style.display = "none";
      document.getElementById("renameBox2").style.display = "none";
    }
  }

  joinChannel(group, channel){
    let room = group + "-" + channel;
    this.shared.changeMessage([group, channel]);
    this.router.navigate(['/chat']);
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
        alert("Error occured, channel not added")
      }
    })
  }

  deleteChannel(){
    this.httpClient.post(BACKEND_URL + '/deleteChannel', [this.activeGroup, this.JoinChannel], httpOptions).subscribe((data:any)=>{
      if (data){
        this.findChannels(this.activeGroup);
      } else {
        alert("Error occured, channel not deleted")
      }
    })
  }

  renameGroup() {
    if (!this.renameGroupForm){
      this.renameGroupForm = true;
      document.getElementById("renameBox").style.display = "block";
      document.getElementById("renameBox2").style.display = "block";

      if (this.deleteFromGroupForm == true){
        this.deleteFromGroupForm = false;
        this.newDeleteFromGroup = "";
        document.getElementById("deleteUserGroup").style.display = "none";
        document.getElementById("deleteUserGroup2").style.display = "none";
      } else if (this.inviteForm == true){
        this.inviteForm = false;
        this.newInviteGroup = "";
        document.getElementById("newInviteGroup").style.display = "none";
        document.getElementById("newInviteGroup2").style.display = "none";
      }
    }
    else {
      this.renameGroupForm = false;
      document.getElementById("renameBox").style.display = "none";
      document.getElementById("renameBox2").style.display = "none";
      if (this.newGroupName != ""){
        alert("Changing name of " + this.activeGroup + " to " + this.newGroupName);
        this.httpClient.post(BACKEND_URL + '/renameGroup', [this.activeGroup, this.newGroupName], httpOptions).subscribe((data:any)=>{
          if (data[0]){
            this.activeGroup = data[1];
            this.findGroups();
          } else {
            alert("Error occured, invalid name")
          }
        })
        this.newGroupName = ""
      }
    }
  }

  deleteGroup(){
    this.httpClient.post(BACKEND_URL + '/deleteGroup', [this.activeGroup], httpOptions).subscribe((data:any)=>{
      if (data){
        this.findGroups();
        this.activeGroup = "";
        this.userChannels = [];
      } else {
        alert("Error occured, group not deleted")
      }
    })
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
      document.getElementById("newInviteGroup2").style.display = "block";
      if (this.deleteFromGroupForm == true){
        this.deleteFromGroupForm = false;
        this.newDeleteFromGroup = "";
        document.getElementById("deleteUserGroup").style.display = "none";
        document.getElementById("deleteUserGroup2").style.display = "none";
      } else if (this.renameGroupForm == true){
        this.newGroupName = "";
        this.renameGroupForm = false;
        document.getElementById("renameBox").style.display = "none";
        document.getElementById("renameBox2").style.display = "none";
      }
    }
    else {
      this.sendGroupInvite(this.newInviteGroup, this.activeGroup)
      this.inviteForm = false;
      document.getElementById("newInviteGroup").style.display = "none";
      document.getElementById("newInviteGroup2").style.display = "none";
    }
  }

  sendGroupInvite(user, group){
    if (user != ""){
      this.httpClient.post(BACKEND_URL + '/sendGroupInvite', [user, group], httpOptions).subscribe((data:any)=>{
        if (data){
          this.inviteForm = false;
          this.newInviteGroup = "";
          alert(user + " added to " + group)
        }
      })
    }
  }

  deleteFromGroup(group){
    if (!this.deleteFromGroupForm){
      this.httpClient.post(BACKEND_URL + '/deleteFromGroup', [group, this.username], httpOptions).subscribe((data:any)=>{
        this.deleteUsersFromGroup = data
      })
      this.deleteFromGroupForm = true;
      document.getElementById("deleteUserGroup").style.display = "block";
      document.getElementById("deleteUserGroup2").style.display = "block";

      if (this.inviteForm == true){
        this.inviteForm = false;
        this.newInviteGroup = "";
        document.getElementById("newInviteGroup").style.display = "none";
        document.getElementById("newInviteGroup2").style.display = "none";
      } else if (this.renameGroupForm == true){
        this.newGroupName = "";
        this.renameGroupForm = false;
        document.getElementById("renameBox").style.display = "none";
        document.getElementById("renameBox2").style.display = "none";
      }
    }
    else {
      this.sendDeleteFromGroup(this.newDeleteFromGroup, this.activeGroup)
      this.deleteFromGroupForm = false;
      document.getElementById("deleteUserGroup").style.display = "none";
      document.getElementById("deleteUserGroup2").style.display = "none";
    }
  }

  sendDeleteFromGroup(user, group){
    if (user != ""){
      this.httpClient.post(BACKEND_URL + '/sendDeleteFromGroup', [user, group], httpOptions).subscribe((data:any)=>{
        if (data){
          this.deleteFromGroupForm = false;
          this.newDeleteFromGroup = "";
          alert(user + " removed from " + group)
        }
      })
    }
  }

  inviteChannel(group, channel){
    if (!this.inviteChannelForm){
      this.httpClient.post(BACKEND_URL + '/findChannelInvite', [group, channel], httpOptions).subscribe((data:any)=>{
        this.inviteChannelUsers = data
      })
      this.inviteChannelForm = true;
      document.getElementById("newInviteChannel").style.display = "block";
      document.getElementById("newInviteChannel2").style.display = "block";
      if (this.deleteFromChannelForm == true){
        this.deleteFromChannelForm = false;
        this.newDeleteFromChannel = "";
        document.getElementById("deleteUserChannel").style.display = "none";
        document.getElementById("deleteUserChannel2").style.display = "none";
      }
    }
    else{
      this.inviteChannelForm = false;
      this.newInviteChannel = "";
      document.getElementById("newInviteChannel").style.display = "none";
      document.getElementById("newInviteChannel2").style.display = "none";
    }
  }

  sendChannelInvite(user, group, channel){
    if (user != ""){
      this.httpClient.post(BACKEND_URL + '/sendChannelInvite', [user, group, channel], httpOptions).subscribe((data:any)=>{
        if (data){
          this.inviteChannel(group, channel);
          alert(user + " added to " + channel)
        }
      })
    }
  }

  deleteUserFromChannel(channel){
    if (!this.deleteFromChannelForm){
      this.httpClient.post(BACKEND_URL + '/deleteFromChannel', [channel, this.activeGroup, this.username], httpOptions).subscribe((data:any)=>{
        this.deleteUsersFromChannel = data
      })
      this.deleteFromChannelForm = true;
      document.getElementById("deleteUserChannel").style.display = "block";
      document.getElementById("deleteUserChannel2").style.display = "block";
    }
    else {
      this.deleteFromChannelForm = false;
      this.newDeleteFromChannel = ""
      document.getElementById("deleteUserChannel").style.display = "none";
      document.getElementById("deleteUserChannel2").style.display = "none";

    }
    if (this.inviteChannelForm == true){
      this.inviteChannelForm = false;
      this.newInviteChannel = "";
      document.getElementById("newInviteChannel").style.display = "none";
      document.getElementById("newInviteChannel2").style.display = "none";
    }
  }

  sendDeleteFromChannel(){
    if (this.newDeleteFromChannel != ""){
      this.httpClient.post(BACKEND_URL + '/sendDeleteFromChannel', [this.JoinChannel, this.activeGroup, this.newDeleteFromChannel], httpOptions).subscribe((data:any)=>{
        if (data){
          alert(this.newDeleteFromChannel + " removed from " + this.JoinChannel + " in " + this.activeGroup)
          this.deleteUserFromChannel(this.JoinChannel);
        }
      })
    }
  }
}
