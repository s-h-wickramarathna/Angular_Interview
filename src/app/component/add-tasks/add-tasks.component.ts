import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddTasksComponentService } from './add-tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tasks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css'] // Fixed the typo here
})

export class AddTasksComponent implements OnInit {
  myForm: FormGroup;
  token: any ="";

  constructor(private fb: FormBuilder, private router: Router, private location: Location, private addTasksService: AddTasksComponentService) {
    // Initialize the form group here
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['2', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.token = sessionStorage.getItem('access_token');
    if (this.token === "" || this.token === null) {
      this.router.navigate(['/unauthorized']);
    }else{
      console.log(this.token);
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Call the service method to send form data with the Bearer token, and subscribe to the result
      this.addTasksService.createTask(this.myForm.value, this.token).subscribe({
        next: (response) => {
          if ((response.status === 200 || response.status === 201) && response.data === 2) {
            // Redirect to the previous page
            this.location.back(); // Replace with your actual route

          } else if ((response.status === 200 || response.status === 201) && response.data === 1) {
            alert("Task Already Created");
            this.onCancel();

          } else if ((response.status === 200 || response.status === 201) && response.data === 3) {
            console.log(response);

          }else{
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
    } else {
      this.myForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  // Getters for easier access to form controls
  get title() {
    return this.myForm.get('title');
  }

  get description() {
    return this.myForm.get('description');
  }

  get status() {
    return this.myForm.get('status');
  }

  onCancel() {
    this.myForm.reset({
      title: '',
      description: '',
      status: '2' // Set the default value of status to '2'
    });
  }

}
