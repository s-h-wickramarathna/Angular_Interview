import { Component, OnInit } from '@angular/core';
import { AdminComponentService } from './admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  token: any = "";

  constructor(private adminService: AdminComponentService, private router: Router) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('access_token');
  
  // Log the token for debugging purposes
  console.log(this.token);

  // Check if the token is present
  if (this.token) {
      this.adminService.loadAdmin(this.token).subscribe({
        next: (response) => {
          if (response.status === 200 || response.status === 201) {
            console.log(response.data);
  
          }else {
            this.router.navigate(['/unauthorized']);
          }
        },
        error: (error) => {
          console.error('Error submitting form:', error);
          if (error.response?.status === 500) {
            console.log(error);
  
          } else if (error.response?.status === 401) {
            this.router.navigate(['/unauthorized']);
          } else {
            alert("An error occurred during login. Please try again later.");
          }
        }
      });
    
  } else {
    // No token present; navigate to the unauthorized page
    this.router.navigate(['/unauthorized']);
  }
  }
}
