// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private role: string = '';

  setRole(role: string) {
    this.role = role;
  }

  getRole(): string {
    return this.role;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isCustomer(): boolean {
    return this.role === 'customer';
  }
}
