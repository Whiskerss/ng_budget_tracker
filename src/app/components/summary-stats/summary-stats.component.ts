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

  ngOnInit(): void {
    this.calculateData();

    // Subscribe to dataUpdated event to recalculate on changes
    this.userService.dataUpdated.subscribe(() => {
      this.calculateData();
    });
  }

  calculateData(): void {
    // Calculate total expenses
    this.expense = this.userService
      .getFinancialData()
      .filter((entry: { type: string }) => entry.type === 'Expense')
      .reduce(
        (total: number, entry: { amount: number }) => total + entry.amount,
        0
      );

    // Calculate total income
    this.income = this.userService
      .getFinancialData()
      .filter((entry: { type: string }) => entry.type === 'Income')
      .reduce(
        (total: number, entry: { amount: number }) => total + entry.amount,
        0
      );

    // Calculate the balance
    this.balance = this.income - this.expense;
  }
}
