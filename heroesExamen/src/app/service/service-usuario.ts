import { InterfaceUsuario } from './../interface/interface-usuario';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../interface/interface-login';

@Injectable({
  providedIn: 'root',
})
export class ServiceUsuario {

  private baseUrl: string = '/api/login'

  httpClient = inject(HttpClient);
  router = inject(Router);

  constructor() { }

  login(user: LoginRequest): Promise<LoginResponse> {
    return lastValueFrom(this.httpClient.post<LoginResponse>(this.baseUrl, user))
      .then(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/landingPage']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
