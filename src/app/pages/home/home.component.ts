import { Component } from '@angular/core';
import { CurrentUserService } from '../../services/current-user.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Globals } from '../../globals/global';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public filterForm!: FormGroup;
  currentUser: User;

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router,
    public globals: Globals
  ) {
    this.currentUser = this.currentUserService.getCurrentUser();
  }
  
  logout(): void {
    this.currentUserService.clearCurrentUser();
    this.router.navigate(['/login']);
  }
}
