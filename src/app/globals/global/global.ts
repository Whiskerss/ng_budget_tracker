import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  categories = [
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

  reoccurings = ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Sometimes', 'Other'];

  isFormVisible: boolean = false;
  isStatsVisible: boolean = true;

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
    console.log(this.isFormVisible);
  }

  public editData: any = null;
}
