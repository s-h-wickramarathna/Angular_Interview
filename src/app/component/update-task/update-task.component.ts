import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateTasksComponentService } from './update-task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

export class UpdateTaskComponent implements OnInit {
  myForm: FormGroup;
  token: any = "";
  id: string | null = null;
  routeSub: Subscription | undefined;

  defaultValue = {
    title: "",
    description: "",
    status: "2"
  }

  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private router: Router, private location: Location, private updateTasksService: UpdateTasksComponentService) {
    // Initialize the form group here
    this.myForm = this.fb.group({
      title: [this.defaultValue.title, Validators.required],
      description: [this.defaultValue.description, Validators.required],
      status: [this.defaultValue.status, [Validators.required]],
    });
  }
  
  ngOnInit(): void {
    this.token = sessionStorage.getItem('access_token');
    if (this.token === "" || this.token === null) {
      this.router.navigate(['/unauthorized']);
    } else {
      // Subscribe to route parameters
      this.routeSub = this.activeRoute.paramMap.subscribe(params => {
        this.id = params.get('id');
        this.updateTasksService.loadTaskById(this.id!, this.token).subscribe({
          next: (response) => {
            if (response.status === 200 || response.status === 201) {
              // Set the default values for the form using patchValue
              this.myForm.patchValue({
                title: response.data.title,
                description: response.data.description,
                status: response.data.status
              });
              console.log(response.data);
            } else if (response.status === 204 || response.data == "") {
              alert("No tasks found");
            } else {
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
      });
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.updateTasksService.updateTask(this.id!,this.myForm.value, this.token).subscribe({
        next: (response) => {
          if ((response.status === 200 || response.status === 201) && response.data === 2) {
            // Redirect to the previous page
            this.location.back(); // Replace with your actual route

          } else if ((response.status === 200 || response.status === 201) && response.data === 4) {
            alert("Task Not Found");
            this.onCancel();

          }else{
            console.log(response);

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
    title: this.defaultValue.title,
    description: this.defaultValue.description,
    status: this.defaultValue.status // Set the default value of status to '2'
  });
}
}
