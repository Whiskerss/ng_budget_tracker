import { Injectable } from '@angular/core';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userStorageKey = 'users';
  
  constructor(private currentUserService: CurrentUserService) {}

  private getUsers(): any[] {
    const usersString = localStorage.getItem(this.userStorageKey);
    return usersString ? JSON.parse(usersString) : [];
  }

  register(user: any): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.userStorageKey, JSON.stringify(users));
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.currentUserService.setCurrentUser(user);
      return true;
    } else {
      return false;
    }
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
}
