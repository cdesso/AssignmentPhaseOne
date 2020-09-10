import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagecontent:string="";
  messages:string[] = [];
  ioConnection:any;
  // id = sessionStorage.getItem('id');
  username = localStorage.getItem('localStorage');

  constructor(private socketService:SocketService, private router: Router) { }

  ngOnInit(): void {
    alert('Not implemented fully, redirecting to home');
    this.router.navigateByUrl('');
    // alert(localStorage.getItem('localStorage'));
    // if (localStorage.getItem('localStorage') != null){
    //   this.initIoConnection();
    // }
    // else{
    //   this.router.navigateByUrl('login');
    // }
  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()
    .subscribe((message:string) => {
      this.messages.push(message);
    });
  }

  public chat(){
    if (this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent=null;
    }
    else {
      console.log("no message");
    }
  }
}
