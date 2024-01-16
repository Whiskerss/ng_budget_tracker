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
}
