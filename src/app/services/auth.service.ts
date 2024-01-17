import { Injectable } from '@angular/core';
import { CurrentUserService } from './current-user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Key for storing user data in local storage
  private readonly userStorageKey = 'users';

  constructor(private currentUserService: CurrentUserService) {}

  // Method to retrieve users from local storage
  private getUsers(): User[] {
    const usersString = localStorage.getItem(this.userStorageKey);
    return usersString ? JSON.parse(usersString) : [];
  }

  // Method to register a new user
  register(user: User): void {
    const users: User[] = this.getUsers(); // Retrieve existing users
    users.push(user); // Add the new user
    localStorage.setItem(this.userStorageKey, JSON.stringify(users)); // Update user data in local storage
  }

  // Method to authenticate a user during login
  login(email: string, password: string): boolean {
    const users: User[] = this.getUsers();

    // Find the user with the provided email and password
    const user: User | undefined = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      this.currentUserService.setCurrentUser(user);
      return true;
    } else {
      return false;
    }
  }

  // Method to check if a user with the given email already exists
  checkUser(email: string): boolean {
    const users: User[] = this.getUsers();
    const user = users.find((u) => u.email === email);
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
