import { Injectable } from '@angular/core';
import { FinancialData } from '../models/financial-data.model';

@Injectable()
export class Globals {
  categories: string[] = [
    'Utilities',
    'Primary Income',
    'Secondary Income',
    'Investment',
    'Housing',
    'Transportation',
    'Food',
    'Personal',
    'Entertainment',
    'Savings',
  ];

  reoccurings: string[] = [
    'Daily',
    'Weekly',
    'Monthly',
    'Yearly',
    'Sometimes',
    'Other',
  ];

  // Flag to control the visibility of the form
  isFormVisible: boolean = false;

  // Flag to control the visibility of table
  isStatsVisible: boolean = true;

  // Method to toggle the visibility of the form
  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  // Public property to store the financial data being edited
  public editData?: FinancialData;
}
