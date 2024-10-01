import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateTasksComponentService } from './update-task.service';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})

export class UpdateTaskComponent {
  myForm: FormGroup;

  defaultTitle = 'mokada karanne';
  defaultDescription = 'mukuth nada karanne';
  defaultStatus = '2';

  constructor(private fb: FormBuilder, private location: Location, private updateTasksService: UpdateTasksComponentService) {
    // Initialize the form group here
    this.myForm = this.fb.group({
      title: [this.defaultTitle, Validators.required],
      description: [this.defaultDescription, Validators.required],
      status: [this.defaultStatus, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwYXNhbjEyMyIsImlhdCI6MTcyNzgwMTA4OCwiZXhwIjoxNzI3ODg3NDg4fQ.qhraMuv4PQj5KZan6JxQay5wOBFf_tAtZSEAcEjzbJLAnAAgo8sLjNXA1P-LTv1r"; // Retrieve the token from local storage

      // Call the service method to send form data with the Bearer token, and subscribe to the result
      this.updateTasksService.updateTask("1",this.myForm.value, token!).subscribe({
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
      title: this.defaultTitle,
      description: this.defaultDescription,
      status: this.defaultStatus // Set the default value of status to '2'
    });
  }
}
