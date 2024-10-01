import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    // Initialize the form group here
    this.myForm = this.fb.group({
      title: [this.defaultTitle, Validators.required],
      description: [this.defaultDescription, Validators.required],
      status: [this.defaultStatus, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Handle valid form submission
      console.log(this.myForm.value);
    } else {
      // Mark all controls as touched to show validation errors
      this.myForm.markAllAsTouched();
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
