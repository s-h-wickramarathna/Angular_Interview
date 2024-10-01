import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UpdateTaskComponent } from './component/update-task/update-task.component';
import { HomeComponent } from './component/home/home.component';
import { AddTasksComponent } from './component/add-tasks/add-tasks.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Default route
  { path: 'update', component: UpdateTaskComponent },
  { path: 'add', component: AddTasksComponent },
  
];
