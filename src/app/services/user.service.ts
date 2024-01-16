import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userStorageKey = 'users';
  dataUpdated: EventEmitter<any> = new EventEmitter();

  getUsers(): any[] {
    const usersString = localStorage.getItem(this.userStorageKey);
    return usersString ? JSON.parse(usersString) : [];
  }

  getUserById(userId: string): any {
    const users = this.getUsers();
    return users.find((user) => user.id === userId) || null;
  }

  addUser(user: any): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.userStorageKey, JSON.stringify(users));
  }

  updateUser(user: any): void {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem(this.userStorageKey, JSON.stringify(users));
    }
  }

  addFinancialData(userId: string, formData: any): void {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      users[userIndex].financialData = users[userIndex].financialData || [];
      users[userIndex].financialData.push(formData);

      localStorage.setItem(this.userStorageKey, JSON.stringify(users));
      this.dataUpdated.emit();
    } else {
      console.log('Add Error');
    }
  }

  deleteFinancialData(userId: string, id: string): void {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

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
        console.log('Financial Data not found for deletion');
      }

      localStorage.setItem(this.userStorageKey, JSON.stringify(users));
      this.dataUpdated.emit();
    } else {
      console.log('User not found!');
    }
  }
}
