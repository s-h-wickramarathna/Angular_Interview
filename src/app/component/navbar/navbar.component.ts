import { Component, OnInit } from '@angular/core';
import { NavBarComponentService } from './navbar.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  token: any = "";

  constructor(private navbarService: NavBarComponentService, private router: Router) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('access_token');
  
  // Log the token for debugging purposes
  console.log(this.token);

  // Check if the token is present
  if (this.token) {
    console.log("Token present");
  } else {
    // No token present; navigate to the unauthorized page
    this.router.navigate(['/unauthorized']);
  }
  }
 
  onLogout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }
}
