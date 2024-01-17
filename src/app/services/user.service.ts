import { EventEmitter, Injectable } from '@angular/core';
import { CurrentUserService } from './current-user.service';
import { User } from '../models/user.model';
import { FinancialData } from '../models/financial-data.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userStorageKey = 'users';
  private currentUserId: string;
  dataUpdated: EventEmitter<any> = new EventEmitter(); // EventEmitter to notify components about data updates

  constructor(private currentUserService: CurrentUserService) {
    this.currentUserId = this.currentUserService.getCurrentUser().id;
  }

  // Method to retrieve all users from local storage
  getUsers(): User[] {
    const usersString = localStorage.getItem(this.userStorageKey);
    return usersString ? JSON.parse(usersString) : [];
  }

  // Method to retrieve financial data for the current user
  getFinancialData(): FinancialData[] {
    this.currentUserId = this.currentUserService.getCurrentUser().id;
    const users: User[] = this.getUsers();
    const currentUserIndex = users.findIndex(
      (user) => user.id === this.currentUserId
    );
    return users[currentUserIndex].financialData || [];
  }

  // Method to add financial data for the current user
  addFinancialData(formData: FinancialData): void {
    const users: User[] = this.getUsers();
    const currentUserIndex: number = users.findIndex(
      (user) => user.id === this.currentUserId
    );

    if (currentUserIndex !== -1) {
      users[currentUserIndex].financialData =
        users[currentUserIndex].financialData || [];
      users[currentUserIndex].financialData!.push(formData);

      localStorage.setItem(this.userStorageKey, JSON.stringify(users));
      this.dataUpdated.emit(); // Notify components about the data update
    } else {
      console.log('Add: User Not Found!');
    }
  }

  // Method to edit existing financial data for the current user
  editFinancialData(formData: any): void {
    const users: User[] = this.getUsers();
    const currentUserIndex: number = users.findIndex(
      (user) => user.id === this.currentUserId
    );

    if (currentUserIndex !== -1) {
      const financialData: FinancialData[] =
        users[currentUserIndex].financialData || [];
      const formDataIndex = financialData.findIndex(
        (data: FinancialData) => data.id === formData.id
      );

      if (formDataIndex !== -1) {
        financialData[formDataIndex] = formData;
        localStorage.setItem(this.userStorageKey, JSON.stringify(users));
        this.dataUpdated.emit(); // Notify components about the data update
      } else {
        console.log('Edit: Financial Data not found!');
      }
    } else {
      console.log('Edit: User Not Found!');
    }
  }

  // Method to delete financial data for the current user
  deleteFinancialData(id: string): void {
    const users: User[] = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === this.currentUserId);

    if (userIndex !== -1) {
      const financialData = users[userIndex].financialData || [];

      const formDataIndex = financialData.findIndex(
        (data: FinancialData) => data.id === id
      );

      if (formDataIndex !== -1) {
        financialData.splice(formDataIndex, 1);

        localStorage.setItem(this.userStorageKey, JSON.stringify(users));
        this.dataUpdated.emit(); // Notify components about the data update
      } else {
        console.log('Delete: Financial Data not found!');
      }
    } else {
      console.log('Delete: User not found!');
    }
  }
}
