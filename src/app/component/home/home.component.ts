import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomeComponentService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  allTasks: any[] = [];
  token: any;

  constructor(private router: Router, private homeService: HomeComponentService) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('access_token');
  
  // Log the token for debugging purposes
  console.log(this.token);

  // Check if the token is present
  if (this.token) {
    // Token is present; proceed with loading tasks
    this.onLoadAllTasks();
  } else {
    // No token present; navigate to the unauthorized page
    this.router.navigate(['/unauthorized']);
  }
  }

  onLoadAllTasks() {
    this.homeService.loadAllTask(this.token).subscribe({
      next: (response) => {
        if (response.status === 200 || response.status === 201) {
          this.allTasks = response.data;

        } else if (response.status === 204 || response.data == "") {
          alert("No tasks found");

        } else {
          console.log(response)
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
  }

  onDelete(id: any) {
    this.homeService.deleteTask(id, this.token).subscribe({
      next: (response) => {
        if (response.status === 200 || response.status === 201) {
          this.onLoadAllTasks();

        }else {
          console.log(response);
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
  }


}
