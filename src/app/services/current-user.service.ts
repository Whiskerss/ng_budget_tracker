import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private readonly currentUserStorageKey = 'current-user';

  getCurrentUser(): any {
    const currentUserString = localStorage.getItem(this.currentUserStorageKey);
    return currentUserString ? JSON.parse(currentUserString) : null;
  }

  setCurrentUser(user: any): void {
    localStorage.setItem(this.currentUserStorageKey, JSON.stringify(user));
  }

  clearCurrentUser(): void {
    localStorage.removeItem(this.currentUserStorageKey);
  }
}
