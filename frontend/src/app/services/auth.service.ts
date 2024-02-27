import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:8081/api/v1/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${BASE_URL}auth/login`, {
      email,
      password,
    });
  }

  register(email: string, password: string, name: string) {
    return this.http.post(`${BASE_URL}auth/register`, {
      email,
      password,
      name,
    });
  }

  logout(): void {
    localStorage.clear();
    console.log('logged out');
  }
}
