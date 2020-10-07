import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedDataService } from '../services/shared-data.service'
import { ImgUploadService } from '../services/img-upload.service';

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
  renameGroupForm = false

  //Variables for Adding/Removing users from Groups/Channels
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

  //Variables for user creation/deletion
  NewUsername = "";
  NewEmail = "";
  NewPassword = "";
  NewPassword2 = "";
  NewRole = "U";
  UserError = "";
  EmailError = "";
  PasswordError = "";

  userForm = false;
  UsersArray=[];
  UserDelete = ""

  //Variables for file upload
  selectedFile = null;
  imagePath = "";

  //Admin Tabs
  channelAdmin = false;
  groupAdmin = false;

  constructor(private router: Router, private httpClient: HttpClient, private shared: SharedDataService, private imgUploadService: ImgUploadService) { }

  ngOnInit(): void {
    if (this.username == null){
      this.router.navigateByUrl('login');
    }
    this.findGroups();
  }

  openChannelAdmin(){
    // Toggling channel admin menu
    if(!this.channelAdmin){
      this.channelAdmin = true;
    } else{
      this.channelAdmin = false;
      this.inviteChannelForm = false;
      this.deleteFromChannelForm = false;
    }
  }
  
  openGroupAdmin(){
    // Toggling group admin menu
    if(!this.groupAdmin){
      this.groupAdmin = true;
    } else{
      this.groupAdmin = false;
      this.inviteForm = false;
      this.deleteFromGroupForm = false;
    }
  }

  newUserForm(){
    // Toggling user form
    if (!this.userForm){
      this.userForm = true;
    } else {
      this.userForm = false;
    }
  }

  addUser(){
    // Method for new users, post to server route and handle response from server
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
    // Find all users in database and extract current user. Used to upgrade or remove users
    this.httpClient.post(BACKEND_URL + '/findUsers', httpOptions).subscribe((data:any)=>{
      if (this.UsersArray[0]){
        this.UsersArray = []
      } else {
        for (let i = 0; i < data.length; i++){
          if (data[i].username == this.username){   continue;   }
          this.UsersArray.push({"username": data[i].username, "role": data[i].role});
        }
      }
      
    })
  }

  delUser(user){
    // Delete a specific user from the database
    this.httpClient.post(BACKEND_URL + '/delUser', [user], httpOptions).subscribe((data:any)=>{
      this.UsersArray = []
      for (let i = 0; i < data.length; i++){
        if (data[i] != this.username){
          this.UsersArray.push({"username": data[i], "id": i});
        }
      }
    })
  }

  findGroups(){
    // Find all groups which the user if part of (if they are base users). Find all groups if they are SAs or GAs
    this.httpClient.post(BACKEND_URL + '/findGroups', [this.username, this.role], httpOptions).subscribe((data:any)=>{
      this.userGroups = data
    })
  }

  findChannels(group){
    // Find all channels which the user is part of (if they are base users). Find all channels if they are SAs or GAs
      this.JoinChannel = '';
      this.activeGroup = group;
      this.httpClient.post(BACKEND_URL + '/findChannels', [this.username, this.activeGroup, this.role], httpOptions).subscribe((data:any)=>{
        this.userChannels = data;
      })
  }

  joinChannel(){    
    // Joining a chat room with given group and channel variables.
    if (this.JoinChannel != ""){
      let room = this.activeGroup + "-" + this.JoinChannel;
      this.shared.changeMessage([this.activeGroup, this.JoinChannel]);
      this.router.navigate(['/chat']);
    }
  }

  addGroup(){
    // Adding a new group
    console.log(true)
    this.httpClient.post(BACKEND_URL + '/addGroup', [this.username], httpOptions).subscribe((data:any)=>{
      if (data){
        this.findGroups();
      } else {
        alert("Error occured, group not added")
      }
    })
  }

  addChannel(){
    // Adding a new channel to a given group
    this.httpClient.post(BACKEND_URL + '/addChannel', [this.activeGroup], httpOptions).subscribe((data:any)=>{
      if (data){
        this.findChannels(this.activeGroup);
      } else {
        alert("Error occured, channel not added")
      }
    })
  }

  deleteChannel(){
    // Deleting a channel from a group
    this.httpClient.post(BACKEND_URL + '/deleteChannel', [this.activeGroup, this.JoinChannel], httpOptions).subscribe((data:any)=>{
      if (data){
        this.findChannels(this.activeGroup);
      } else {
        alert("Error occured, channel not deleted")
      }
    })
  }

  renameGroup() {
    // Renaming a group
    if (!this.renameGroupForm){
      this.renameGroupForm = true;
      if (this.deleteFromGroupForm || this.inviteForm){
        this.deleteFromGroupForm = false;
        this.newDeleteFromGroup = "";
        this.inviteForm = false;
        this.newInviteGroup = "";
      }
    } else {
      this.renameGroupForm = false;
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
    // Deleting a group
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

  upgradeUser(user){
    // Upgrading user to SA
    this.httpClient.post(BACKEND_URL + '/upgradeUser', [user], httpOptions).subscribe((data:any)=>{
      if(!data){
        alert("User is already a super admin");
      } else {
        alert("done");
      }
    })
  }

  inviteGroup(group){
    // Find users to invite to group
    if (!this.inviteForm){
      this.httpClient.post(BACKEND_URL + '/findInvite', [group], httpOptions).subscribe((data:any)=>{
        if (data.length == 0){
          this.inviteForm = false;
          alert("No users left to invite");
        } else {
          this.inviteUsers = data;
        }
      })
      this.inviteForm = true;
      if (this.deleteFromGroupForm == true){
        this.deleteFromGroupForm = false;
        this.newDeleteFromGroup = "";
      }
    }
  }

  sendGroupInvite(){
    // Add a user to a group
    this.inviteForm = false;
    if (this.newInviteGroup != ""){
      this.httpClient.post(BACKEND_URL + '/sendGroupInvite', [this.newInviteGroup, this.activeGroup], httpOptions).subscribe((data:any)=>{
        if (data){
          alert(this.newInviteGroup + " added to " + this.activeGroup)
          this.newInviteGroup = "";
        }
      })
    }
  }

  deleteFromGroup(){
    // Find users to delete from a group
    if (!this.deleteFromGroupForm){
      this.httpClient.post(BACKEND_URL + '/deleteFromGroup', [this.activeGroup, this.username], httpOptions).subscribe((data:any)=>{
        if (data.length == 0){
          this.deleteFromGroupForm = false;
          alert("No users to delete");
        } else {
          this.deleteUsersFromGroup = data;
        }
      })
      this.deleteFromGroupForm = true;
      if (this.inviteForm == true){
        this.inviteForm = false;
        this.newInviteGroup = "";
      } 
      else if (this.renameGroupForm == true){
        this.newGroupName = "";
        this.renameGroupForm = false;
      }
    }
  }

  sendDeleteFromGroup(){
    // Remove user from group
    this.deleteFromGroupForm = false;
    if (this.newDeleteFromGroup != ""){
      this.httpClient.post(BACKEND_URL + '/sendDeleteFromGroup', [this.newDeleteFromGroup, this.activeGroup], httpOptions).subscribe((data:any)=>{
        if (data){
          alert(this.newDeleteFromGroup + " removed from " + this.activeGroup);
          this.newDeleteFromGroup = "";
        }
      })
    }
  }

  inviteChannel(group, channel){
    // Find users to invite to a channel
    if (!this.inviteChannelForm){
      this.httpClient.post(BACKEND_URL + '/findChannelInvite', [group, channel], httpOptions).subscribe((data:any)=>{
        if (data.length == 0){
          this.inviteChannelForm = false;
          alert("No users left to invite")
        } else {
          this.inviteChannelUsers = data
        }
      })
      this.inviteChannelForm = true;
      
      if (this.deleteFromChannelForm == true){
        this.deleteFromChannelForm = false;
        this.newDeleteFromChannel = "";
      }
    }
  }

  sendChannelInvite(user, group, channel){
    // Invite user to a channel
    this.inviteChannelForm = false;
    if (user != ""){
      this.httpClient.post(BACKEND_URL + '/sendChannelInvite', [user, group, channel], httpOptions).subscribe((data:any)=>{
        if (data){
          alert(user + " added to " + channel)
          this.newInviteChannel = "";
        }
      })
    }
  }

  deleteUserFromChannel(channel){
    // Find users to delete from a channel
    if (!this.deleteFromChannelForm){
      this.httpClient.post(BACKEND_URL + '/deleteFromChannel', [channel, this.activeGroup, this.username], httpOptions).subscribe((data:any)=>{
        if (data.length == 0){
          this.deleteFromChannelForm = false;
          alert("No users left to remove")
        } else {
        this.deleteUsersFromChannel = data
        }
      })
      this.deleteFromChannelForm = true;
    }

    if (this.inviteChannelForm == true){
      this.inviteChannelForm = false;
      this.newInviteChannel = "";
    }
  }

  sendDeleteFromChannel(){
    // Delete a user from a channel
    this.deleteFromChannelForm = false;
    if (this.newDeleteFromChannel != ""){
      this.httpClient.post(BACKEND_URL + '/sendDeleteFromChannel', [this.JoinChannel, this.activeGroup, this.newDeleteFromChannel], httpOptions).subscribe((data:any)=>{
        if (data){
          alert(this.newDeleteFromChannel + " removed from " + this.JoinChannel + " in " + this.activeGroup)
        }
      })
    }
  }

  onFileSelected(event){
    // Event handler for image upload
    this.selectedFile = event.target.files[0];
  }

  onUpload(){
    // Structure image data and send to db
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    
    this.imgUploadService.imgUpload(fd).subscribe(res=>{
      this.imagePath = res.data.filename;
    })
  }
}
