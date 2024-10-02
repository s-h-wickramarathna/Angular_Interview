import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class NavBarComponentService {

    private apiUrl = 'http://localhost:8080';

  constructor() { }

  logout(token : string) {
      return axios.get(`${this.apiUrl}/logout`, { withCredentials: true });
       // Handle the response as needed
    
  }
}