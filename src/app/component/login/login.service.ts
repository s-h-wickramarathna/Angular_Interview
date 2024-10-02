import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class LoginComponentService {

    private apiUrl = 'http://localhost:8080/login';

  constructor() { }

  login(formData: any): Observable<any> {
    
    // Wrapping Axios POST request in an Observable
    return from(axios.post(this.apiUrl, formData));
  }

}