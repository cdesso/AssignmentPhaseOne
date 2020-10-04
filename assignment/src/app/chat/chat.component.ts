import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  GroupChannel: any = []
  room:string = ""
  messagecontent:string="";
  messages:string[] = [];
  roomNotice:string  = ""
  userCount:number = 0
  isInRoom = false;
  user = sessionStorage.getItem('username');

  constructor(private socketService:SocketService, private router: Router, private route: ActivatedRoute, private shared: SharedDataService) { }

  ngOnInit(): void {
    this.shared.currentMessage.subscribe(data => (this.GroupChannel = data));
    if (this.GroupChannel[0] == undefined){
      this.router.navigateByUrl('');
    } else {
      this.room = this.GroupChannel[0] + "-" + this.GroupChannel[1];
      this.socketService.initSocket();
      this.socketService.getMessage((m)=>{this.messages = m});
      this.socketService.notice((msg)=>{ this.roomNotice = msg}); 
      this.socketService.joined((msg)=>{ this.room = msg });
      this.joinRoom();
    }
  }

  joinRoom(){
    this.socketService.joinRoom(this.room, this.user);
    this.socketService.requserCount(this.room);
    this.socketService.getuserCount((res)=>{this.userCount = res});
    this.socketService.send(null, null);
  }

  // clearNotice(){
  //   this.roomNotice = "";
  // }

  leaveRoom(){
    this.socketService.leaveRoom(this.room, this.user)
    this.socketService.requserCount(this.room);
    this.socketService.getuserCount((res)=>{this.userCount = res});
    this.room = "";
    this.messages = [];
    this.userCount = 0;
    this.roomNotice = "";
    this.isInRoom = false;
    this.router.navigateByUrl('/');
  }

  chat(){
    if (this.messagecontent){
      this.socketService.send(this.user, this.messagecontent);
      this.messagecontent=null;
    }
    else {
      console.log("no message");
    }
  }
}
