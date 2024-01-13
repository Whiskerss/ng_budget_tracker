import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  storedData: any[] = [];
  currentUser: any = '';

  constructor(
    private localStorageService: LocalStorageService,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.storedData = this.localStorageService.getData('formData');
    this.currentUser = this.currentUserService.getCurrentUser();
  }

  isFormVisible = false;

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }
}
