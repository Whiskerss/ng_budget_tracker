import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userStorageKey = 'users';
  private readonly currentUserStorageKey = 'current-user';

  setCurrentUser(user: any): void {
    localStorage.setItem(this.currentUserStorageKey, JSON.stringify(user));
  }

  checkUser(email: string): boolean {
    const users = this.getUsers();
    const user = users.find((u) => u.email === email);
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.setCurrentUser(user);
      return true;
    } else {
      return false;
    }
  }

  private getUsers(): any[] {
    const usersString = localStorage.getItem(this.userStorageKey);
    return usersString ? JSON.parse(usersString) : [];
  }
}
