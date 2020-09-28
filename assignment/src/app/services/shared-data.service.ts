import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  details: any = [];
  messageSource = new BehaviorSubject(this.details);
  currentMessage = this.messageSource.asObservable();
  changeMessage(data: any){
    this.messageSource.next(data)
  }
}
