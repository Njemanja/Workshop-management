import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  uri='http://127.0.0.1:4000'
    
  constructor(private http:HttpClient) { }
  
  upload(file):Observable<any> {
      const data={
        file:file
      }
      return this.http.post(`${this.uri}/users/dodajSliku`, data);
  }
}
