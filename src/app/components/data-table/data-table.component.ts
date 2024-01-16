import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Globals } from '../../globals/global/global';

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
  categories = this.globals.categories;
  reoccurings = this.globals.reoccurings;

  constructor(private userService: UserService, public globals: Globals) {}

  ngOnInit() {
    this.getStoredData();
    this.totalItems = this.storedData.length;

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
    this.storedData = this.userService
      .getFinancialData()
      .filter((entry: { name: string }) =>
        entry.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  onSearch() {
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
