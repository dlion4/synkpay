import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly EXPIRY_KEY = 'auth_token_expiry';
  private readonly TOKEN_DURATION = 2 * 60 * 60 * 1000;

  constructor() {}

  login(username: string, password: string): boolean {
    if (username && password) {
      const fakeToken = this.generateTemporaryToken();
      const expiryTime = new Date().getTime() + this.TOKEN_DURATION;

      localStorage.setItem(this.TOKEN_KEY, fakeToken);
      localStorage.setItem(this.EXPIRY_KEY, expiryTime.toString());

      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const expiry = localStorage.getItem(this.EXPIRY_KEY);

    if (!token || !expiry) {
      return false;
    }

    const now = new Date().getTime();
    if (now > Number(expiry)) {
      this.logout();
      return false;
    }

    return true;
  }

  getToken(): string | null {
    if (this.isLoggedIn()) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private generateTemporaryToken(): string {
    return 'temp_' + Math.random().toString(36).substring(2) + Date.now();
  }
}
