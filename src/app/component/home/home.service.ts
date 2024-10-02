import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class HomeComponentService {

    private apiUrl = 'http://localhost:8080';

  constructor() { }

  loadAllTask(token: string): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${token}`, // Include the Bearer token in the headers
      'Content-Type': 'application/json'  // Optional, depending on your API requirements
    };
    const urlWithId = `${this.apiUrl}/task/all`;
    // Wrapping Axios POST request in an Observable
    return from(axios.get(urlWithId, { headers }));
  }

  deleteTask(id: string, token: string): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${token}`, // Include the Bearer token in the headers
      'Content-Type': 'application/json'  // Optional, depending on your API requirements
    };
  const urlWithId = `${this.apiUrl}/task/delete/${id}`
    // Wrapping Axios POST request in an Observable
    return from(axios.delete(urlWithId, { headers }));
  }

}