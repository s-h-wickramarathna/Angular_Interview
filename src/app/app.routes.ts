import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UpdateTaskComponent } from './component/update-task/update-task.component';
import { HomeComponent } from './component/home/home.component';
import { AddTasksComponent } from './component/add-tasks/add-tasks.component';
import { LoginComponent } from './component/login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AdminComponent } from './component/admin/admin.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route
  { path: 'home', component: HomeComponent, pathMatch: 'full'}, // Default route
  { path: 'update/:id', component: UpdateTaskComponent },
  { path: 'add', component: AddTasksComponent },
  { path: 'admin', component: AdminComponent },
  // Optionally redirect to unauthorized page if no routes match
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'unauthorized' },
  
];
