import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000/chat';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() { }

  public initSocket(): void {
    this.socket = io(SERVER_URL);
  }
 
  joinRoom(room, user):void{
    this.socket.emit("joinRoom", [room, user])
  }
  leaveRoom(room, user):void{
    this.socket.emit("leaveRoom", [room, user])
  }
  joined(next){
    this.socket.on("joined", res=>next(res));
  }
  requserCount(room){
    this.socket.emit('userCount', room);
  }
  getuserCount(next){
    this.socket.on('userCount', res=>next(res));
  }
  notice(next){
    this.socket.on('notice', res=>next(res));
  }

  send(user, message): void {
    this.socket.emit('message', [user, message]);
  }

  getMessage(next){
    this.socket.on('message', (message)=>next(message));
  }
}