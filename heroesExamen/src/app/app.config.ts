import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

/**
 * Configuración global de la aplicación Angular.
 * Aquí se inyectan los proveedores de servicios necesarios para todo el proyecto.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Optimización de la detección de cambios (Angular 18 default)
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Configuración del sistema de rutas
    provideRouter(routes),
    // Configuración del cliente HTTP con el interceptor de seguridad (JWT)
    provideHttpClient(withInterceptors([authInterceptor])),
    // Habilita el soporte para animaciones (necesario para Bootstrap/SweetAlert2)
    provideAnimationsAsync()
  ]
};
