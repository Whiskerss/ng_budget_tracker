import { Component } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Globals } from '../globals/global/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public filterForm!: FormGroup;
  currentUser: any = null;

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router,
    public globals: Globals
  ) {
    this.currentUser = this.currentUserService.getCurrentUser();
  }
  logout() {
    this.currentUserService.clearCurrentUser();
    this.router.navigate(['/login']);
  }
}
