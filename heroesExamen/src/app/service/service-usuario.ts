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

  // URL base para el endpoint de autenticación
  private baseUrl: string = '/api/login'

  httpClient = inject(HttpClient);
  router = inject(Router);

  constructor() { }

  /**
   * FLUJO DE AUTENTICACIÓN (LOGIN):
   * 1. Enviamos las credenciales (username/password) al backend mediante POST.
   * 2. Si son correctas, el servidor responde con un objeto que contiene un TOKEN JWT.
   * 3. El JWT es como un "pasaporte digital" que identifica al usuario en futuras peticiones.
   * 4. Almacenamos este token en el 'localStorage' del navegador para que persista aunque se recargue la página.
   */
  login(user: LoginRequest): Promise<LoginResponse> {
    return lastValueFrom(this.httpClient.post<LoginResponse>(this.baseUrl, user))
      .then(response => {
        if (response && response.token) {
          // GUARDADO DEL TOKEN:
          // El interceptor leerá este token de aquí para cada petición a la API.
          localStorage.setItem('token', response.token);
        }
        return response;
      });
  }

  /**
   * Cierra la sesión del usuario.
   * Borra el token y redirige a la página de bienvenida.
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/landingPage']);
  }

  /**
   * Comprueba si hay un usuario logueado basándose en la existencia del token.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Recupera el token del localStorage.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
