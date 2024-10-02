import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginComponentService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
     private location: Location,
      private loginService: LoginComponentService,
      private router: Router,
    ) {

    // Initialize the form group here
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  onSubmit() {
    if (this.myForm.valid) {
      // Call the service method to send form data with the Bearer token, and subscribe to the result
      this.loginService.login(this.myForm.value).subscribe({
        next: (response) => {
          if ((response.status === 200 || response.status === 201) && response.data.message === "User login was successful") {
            // 
            // Store the token in Session Storage
            sessionStorage.setItem('access_token', response.data.access_token);
            this.router.navigate(['/home']);

          } else if (response.status === 500 || response.data === "An error occurred: Bad credentials") {
            console.log("Invalid username or password");
            alert("Invalid username or password");

          }else{
            console.log(response);
          }
        },
        error: (error) => {
          console.error('Error submitting form:', error);
          if (error.response?.status === 500 || error.message.includes('Bad credentials')) {
            alert("Invalid username or password");
            this.onCancel();
          } else {
            alert("An error occurred during login. Please try again later.");
          }
        }
      });
    } else {
      this.myForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }


  // Getters for easier access to form controls
  get username() {
    return this.myForm.get('username');
  }

  get password() {
    return this.myForm.get('password');
  }


  onCancel() {
    this.myForm.reset();
  }
}
