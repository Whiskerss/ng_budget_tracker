import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-summary-stats',
  templateUrl: './summary-stats.component.html',
})
export class SummaryStatsComponent implements OnInit {
  expense: number = 0;
  income: number = 0;
  balance: number = 0;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.calculateData();

    this.userService.dataUpdated.subscribe(() => {
      this.calculateData();
    });
  }

  calculateData() {
    this.expense = this.userService
      .getFinancialData()
      .filter((entry: { type: string }) => entry.type === 'Expense')
      .reduce((total: any, entry: { amount: any }) => total + entry.amount, 0);

    this.income = this.userService
      .getFinancialData()
      .filter((entry: { type: string }) => entry.type === 'Income')
      .reduce((total: any, entry: { amount: any }) => total + entry.amount, 0);

    this.balance = this.income - this.expense;
  }
}
