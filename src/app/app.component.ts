import { Component, ElementRef, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Modal } from 'bootstrap';
import { HomeComponent } from './component/home/home.component';
import { UpdateTaskComponent } from './component/update-task/update-task.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    UpdateTaskComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  @ViewChild('myModel',{ static: false }) myModal?: ElementRef;

  title = 'AngularSpringJwt';
  modalTitle: string = '';

  openModal(title: string) {
    this.modalTitle = title;
    const modalElement = document.getElementById('myModel');
    if (modalElement) {
      const myModal = new Modal(modalElement);
      myModal.show(); // Show the modal
    }
  }

  closeModal() {
    (this.myModal?.nativeElement as HTMLElement).style.display = 'none';
  }

}
