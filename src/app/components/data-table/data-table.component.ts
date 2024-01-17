import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Globals } from '../../globals/global';
import { FinancialData } from '../../models/financial-data.model';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements OnInit {
  public storedData?: FinancialData[];

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  showDatePicker: boolean = false;
  appliedFilters: any = {};

  constructor(private userService: UserService, public globals: Globals) {}

  ngOnInit(): void {
    this.getStoredData();

    // Subscribe to dataUpdated event to update data on changes
    this.userService.dataUpdated.subscribe(() => {
      this.getStoredData();
    });
  }

  // Method to paginate the stored data
  paginatedData(): FinancialData[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return this.storedData!.slice(startIndex, endIndex);
  }

  // Method to retrieve and filter financial data based on applied filters
  getStoredData(): void {
    let filteredData: FinancialData[] = this.userService.getFinancialData();

    // Apply filters based on search
    if (this.appliedFilters.searchTerm) {
      filteredData = filteredData.filter((entry: { name: string }) =>
        entry.name
          .toLowerCase()
          .includes(this.appliedFilters.searchTerm.toLowerCase())
      );
    }

    // Apply filters based on type
    if (this.appliedFilters.type) {
      filteredData = filteredData.filter((entry: { type: string }) =>
        entry.type
          .toLowerCase()
          .includes(this.appliedFilters.type.toLowerCase())
      );
    }

    // Apply filters based on reoccurring
    if (this.appliedFilters.reoccuring) {
      filteredData = filteredData.filter((entry: { reoccuring: string }) =>
        entry.reoccuring
          .toLowerCase()
          .includes(this.appliedFilters.reoccuring.toLowerCase())
      );
    }

    // Apply filters based on date range
    if (this.appliedFilters.dateStart && this.appliedFilters.dateEnd) {
      filteredData = filteredData.filter((entry: { date: Date }) => {
        const entryDate = new Date(entry.date);
        const startDate = new Date(this.appliedFilters.dateStart);
        const endDate = new Date(this.appliedFilters.dateEnd);

        return entryDate >= startDate && entryDate <= endDate;
      });
    }

    // Apply filters based on category
    if (this.appliedFilters.category) {
      filteredData = filteredData.filter((entry: { category: string }) =>
        entry.category
          .toLowerCase()
          .includes(this.appliedFilters.category.toLowerCase())
      );
    }

    // Update storedData and totalItems properties
    this.storedData = filteredData;
    this.totalItems = this.storedData.length;
  }

  // Method to handle type filter
  filterType(type: string): void {
    if (type === 'Type') {
      delete this.appliedFilters.type;
    } else {
      this.appliedFilters.type = type;
    }
    this.getStoredData();
  }

  // Method to handle reoccurring filter
  filterReoccuring(reoccuring: string): void {
    if (reoccuring === 'Reoccuring') {
      delete this.appliedFilters.reoccuring;
    } else {
      this.appliedFilters.reoccuring = reoccuring;
    }
    this.getStoredData();
  }

  // Method to handle category filter
  filterCategory(category: string): void {
    if (category === 'Category') {
      delete this.appliedFilters.category;
    } else {
      this.appliedFilters.category = category;
    }
    this.getStoredData();
  }

  // Method to toggle date picker visibility
  toggleDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
  }

  // Method to handle editing financial data
  onEdit(data: FinancialData): void {
    this.globals.toggleFormVisibility();
    this.globals.isStatsVisible = false;
    this.globals.editData = data;
  }

  // Method to handle deleting financial data
  onDelete(id: string): void {
    this.userService.deleteFinancialData(id);
  }
}
