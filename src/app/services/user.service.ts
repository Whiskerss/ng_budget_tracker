import { EventEmitter, Injectable } from '@angular/core';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userStorageKey = 'users';
  dataUpdated: EventEmitter<any> = new EventEmitter();

  constructor(private currentUserService: CurrentUserService) {}

  currentUserId = this.currentUserService.getCurrentUser().id;

  getUsers(): any[] {
    const usersString = localStorage.getItem(this.userStorageKey);
    return usersString ? JSON.parse(usersString) : [];
  }

  getFinancialData() {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === this.currentUserId);
    return users[userIndex].financialData || [];
  }

  addFinancialData(formData: any): void {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === this.currentUserId);

    if (userIndex !== -1) {
      users[userIndex].financialData = users[userIndex].financialData || [];
      users[userIndex].financialData.push(formData);

      localStorage.setItem(this.userStorageKey, JSON.stringify(users));
      this.dataUpdated.emit();
    } else {
      console.log('Add: User Not Found!');
    }
  }

  editFinancialData(formData: any): void {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === this.currentUserId);

    if (userIndex !== -1) {
      const financialData = users[userIndex].financialData || [];
      const formDataIndex = financialData.findIndex(
        (data: typeof financialData) => data.id === formData.id
      );

      if (formDataIndex !== -1) {
        financialData[formDataIndex] = formData;
        localStorage.setItem(this.userStorageKey, JSON.stringify(users));
        this.dataUpdated.emit();
      } else {
        console.log('Edit: Financial Data not found!');
      }
    } else {
      console.log('Edit: User Not Found!');
    }
  }

  deleteFinancialData(id: string): void {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === this.currentUserId);

    if (userIndex !== -1) {
      const financialData = users[userIndex].financialData || [];

      const formDataIndex = financialData.findIndex(
        (data: typeof financialData) => data.id === id
      );

      if (formDataIndex !== -1) {
        financialData.splice(formDataIndex, 1);

        localStorage.setItem(this.userStorageKey, JSON.stringify(users));
        this.dataUpdated.emit();
      } else {
        console.log('Delete: Financial Data not found!');
      }
    } else {
      console.log('Delete: User not found!');
    }
  }
}
