import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private readonly currentUserStorageKey = 'current-user';

  getCurrentUser(): User {
    const currentUserString = localStorage.getItem(this.currentUserStorageKey);
    return currentUserString ? JSON.parse(currentUserString) : null;
  }

  setCurrentUser(user: User): void {
    localStorage.setItem(this.currentUserStorageKey, JSON.stringify(user));
  }

  clearCurrentUser(): void {
    localStorage.removeItem(this.currentUserStorageKey);
  }
}
