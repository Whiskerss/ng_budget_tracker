import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public storedData: any[] = [];
  public editData: any = null;
  currentUser: any = null;
  isFormVisible: boolean = false;
  isStatsVisible: boolean = true;
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
    this.getStoredData();
    this.calculateData();

    this.userService.dataUpdated.subscribe(() => {
      this.getStoredData();
      this.calculateData();
    });
  }

  getStoredData() {
    this.storedData = this.userService.getFinancialData();
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

  onEdit(data: any) {
    this.isFormVisible = true;
    this.isStatsVisible = false;
    this.editData = data;
  }

  onDelete(id: string) {
    this.userService.deleteFinancialData(id);
  }
}
