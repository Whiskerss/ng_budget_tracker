import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Globals } from '../../globals/global';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements OnInit {
  public storedData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';
  showDatePicker: boolean = false;
  appliedFilters: any = {};

  constructor(private userService: UserService, public globals: Globals) {}

  ngOnInit() {
    this.getStoredData();
    this.userService.dataUpdated.subscribe(() => {
      this.getStoredData();
    });
  }

  paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return this.storedData.slice(startIndex, endIndex);
  }

  getStoredData() {
    let filteredData = this.userService.getFinancialData();

    if (this.appliedFilters.name) {
      filteredData = filteredData.filter((entry: { name: string }) =>
        entry.name
          .toLowerCase()
          .includes(this.appliedFilters.name.toLowerCase())
      );
    }

    if (this.appliedFilters.type) {
      filteredData = filteredData.filter((entry: { type: string }) =>
        entry.type
          .toLowerCase()
          .includes(this.appliedFilters.type.toLowerCase())
      );
    }

    if (this.appliedFilters.reoccuring) {
      filteredData = filteredData.filter((entry: { reoccuring: string }) =>
        entry.reoccuring
          .toLowerCase()
          .includes(this.appliedFilters.reoccuring.toLowerCase())
      );
    }

    if (this.appliedFilters.category) {
      filteredData = filteredData.filter((entry: { category: string }) =>
        entry.category
          .toLowerCase()
          .includes(this.appliedFilters.category.toLowerCase())
      );
    }

    this.storedData = filteredData;
    this.totalItems = this.storedData.length;
  }

  onSearch() {
    if (this.searchTerm === '') {
      delete this.appliedFilters.name;
    } else {
      this.appliedFilters.name = this.searchTerm;
    }
    this.getStoredData();
  }

  filterType(type: string) {
    if (type === 'Type') {
      delete this.appliedFilters.type;
    } else {
      this.appliedFilters.type = type;
    }
    this.getStoredData();
  }

  filterReoccuring(reoccuring: string) {
    if (reoccuring === 'Reoccuring') {
      delete this.appliedFilters.reoccuring;
    } else {
      this.appliedFilters.reoccuring = reoccuring;
    }
    this.getStoredData();
  }

  filterCategory(category: string) {
    if (category === 'Category') {
      delete this.appliedFilters.category;
    } else {
      this.appliedFilters.category = category;
    }
    this.getStoredData();
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  onEdit(data: any) {
    this.globals.toggleFormVisibility();
    this.globals.isStatsVisible = false;
    this.globals.editData = data;
  }

  onDelete(id: string) {
    this.userService.deleteFinancialData(id);
  }
}
