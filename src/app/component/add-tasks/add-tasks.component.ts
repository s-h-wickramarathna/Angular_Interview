import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
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

export class AddTasksComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private location: Location, private addTasksService: AddTasksComponentService) {
    // Initialize the form group here
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['2', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwYXNhbjEyMyIsImlhdCI6MTcyNzgwMTA4OCwiZXhwIjoxNzI3ODg3NDg4fQ.qhraMuv4PQj5KZan6JxQay5wOBFf_tAtZSEAcEjzbJLAnAAgo8sLjNXA1P-LTv1r"; // Retrieve the token from local storage

      // Call the service method to send form data with the Bearer token, and subscribe to the result
      this.addTasksService.createTask(this.myForm.value, token!).subscribe({
        next: (response) => {
          if ((response.status === 200 || response.status === 201) && response.data === 2) {
            // Redirect to the previous page
            this.location.back(); // Replace with your actual route
          }
        },
        error: (error) => {
          console.error('Error submitting form:', error);
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
