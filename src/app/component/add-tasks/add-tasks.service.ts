import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class AddTasksComponentService {

    private apiUrl = 'http://localhost:8080/task/create';

  constructor() { }

  createTask(formData: any, token: string): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${token}`, // Include the Bearer token in the headers
      'Content-Type': 'application/json'  // Optional, depending on your API requirements
    };

    // Wrapping Axios POST request in an Observable
    return from(axios.post(this.apiUrl, formData, { headers }));
  }

}