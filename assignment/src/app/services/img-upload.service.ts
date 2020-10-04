import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const BACKEND_URL = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  constructor(private http:HttpClient) { }
  
  imgUpload(fd){
    return this.http.post<any>('/api/upload', fd)
  }
}
