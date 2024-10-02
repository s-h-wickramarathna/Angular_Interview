import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class AdminComponentService {

    private apiUrl = 'http://localhost:8080';

  constructor() { }

  loadAdmin(token: string): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${token}`, // Include the Bearer token in the headers
      'Content-Type': 'application/json'  // Optional, depending on your API requirements
    };
    const urlWithId = `${this.apiUrl}/admin_only/dashboard`;
    // Wrapping Axios POST request in an Observable
    return from(axios.get(urlWithId, { headers }));
  }

}