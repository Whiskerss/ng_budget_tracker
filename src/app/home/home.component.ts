import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Globals } from '../globals/global/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public filterForm!: FormGroup;
  public storedData: any[] = [];
  public editData: any = null;
  currentUser: any = null;
  isFormVisible: boolean = false;
  isStatsVisible: boolean = true;
  expense: number = 0;
  income: number = 0;
  balance: number = 0;
  showDatePicker: boolean = false;
  categories = this.globals.categories;
  reoccurings = this.globals.reoccurings;
  searchTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(
    private currentUserService: CurrentUserService,
    private userService: UserService,
    private router: Router,
    public globals: Globals
  ) {
    this.currentUser = this.currentUserService.getCurrentUser();
  }

  ngOnInit() {
    this.getStoredData();
    this.calculateData();
    this.totalItems = this.storedData.length;

    console.log(this.totalItems);

    this.userService.dataUpdated.subscribe(() => {
      this.getStoredData();
      this.calculateData();
    });
  }

  onSearch() {
    this.getStoredData();
  }

  paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return this.storedData.slice(startIndex, endIndex);
  }

  getStoredData() {
    this.storedData = this.userService
      .getFinancialData()
      .filter((entry: { name: string }) =>
        entry.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
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
