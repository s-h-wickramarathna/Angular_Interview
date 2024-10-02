import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class UpdateTasksComponentService {

    private apiUrl = 'http://localhost:8080/task';

  constructor() { }

  updateTask(id: string, formData: any, token: string): Observable<any> {
    const headers = {
        'Authorization': `Bearer ${token}`, // Include the Bearer token in the headers
        'Content-Type': 'application/json'  // Optional, depending on your API requirements
    };

    // Construct the URL with the ID
    const urlWithId = `${this.apiUrl}/update/${id}`; // Assuming apiUrl is the base URL

    // Wrapping Axios PUT request in an Observable
    return from(axios.put(urlWithId, formData, { headers }));
}

loadTaskById(id: string, token: string): Observable<any> {
  const headers = {
    'Authorization': `Bearer ${token}`, // Include the Bearer token in the headers
    'Content-Type': 'application/json'  // Optional, depending on your API requirements
  };
const urlWithId = `${this.apiUrl}/get/${id}`
  // Wrapping Axios POST request in an Observable
  return from(axios.get(urlWithId, { headers }));
}

}