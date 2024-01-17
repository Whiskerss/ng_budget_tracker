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

  isFormVisible: boolean = false;
  isStatsVisible: boolean = true;

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  public editData?: FinancialData;
}
