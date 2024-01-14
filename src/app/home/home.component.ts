import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public storedData: any[] = [];
  currentUser: any = '';
  isFormVisible: boolean = false;
  expense: number = 0;
  income: number = 0;
  balance: number = 0;

  constructor(
    private currentUserService: CurrentUserService,
    private userService: UserService,
    private router: Router
  ) {
    this.currentUser = this.currentUserService.getCurrentUser();
  }

  ngOnInit() {
    this.updateStoredData();
    this.calculateData();

    this.userService.dataUpdated.subscribe(() => {
      this.updateStoredData();
      this.calculateData();
    });
  }

  updateStoredData() {
    const userId = this.currentUserService.getCurrentUser().id;
    const users = this.userService.getUsers();
    const userIndex = users.findIndex((user) => user.id === userId);
    this.storedData = users[userIndex].financialData || [];
  }

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

  logout() {
    this.currentUserService.clearCurrentUser();
    this.router.navigate(['/login']);
  }

  calculateData() {
    this.expense = this.storedData
      .filter((entry) => entry.type === 'Expense')
      .reduce((total, entry) => total + entry.amount, 0);

    this.income = this.storedData
      .filter((entry) => entry.type === 'Income')
      .reduce((total, entry) => total + entry.amount, 0);

    this.balance = this.income - this.expense;
  }
}
