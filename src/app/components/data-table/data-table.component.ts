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

    if (this.appliedFilters.searchTerm) {
      filteredData = filteredData.filter((entry: { name: string }) =>
        entry.name
          .toLowerCase()
          .includes(this.appliedFilters.searchTerm.toLowerCase())
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

    if (this.appliedFilters.dateStart && this.appliedFilters.dateEnd) {
      filteredData = filteredData.filter((entry: { date: string }) => {
        const entryDate = new Date(entry.date);
        const startDate = new Date(this.appliedFilters.dateStart);
        const endDate = new Date(this.appliedFilters.dateEnd);

        return entryDate >= startDate && entryDate <= endDate;
      });
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
