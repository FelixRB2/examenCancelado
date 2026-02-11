import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ServiceUsuario } from '../service/service-usuario';

/**
 * EXPLICACIÓN DEL INTERCEPTOR:
 * Es como un "peaje" automático por el que pasan todas las peticiones HTTP que enviamos al servidor.
 * Su función es inyectar el Token JWT en la cabecera (Header) de cada mensaje.
 * Sin este token, el servidor de Spring Boot rechazaría nuestras peticiones con un error 403 Forbidden.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const serviceUsuario = inject(ServiceUsuario);
    const token = serviceUsuario.getToken(); // Intentamos recuperar el token del localStorage

    // INYECCIÓN DEL TOKEN:
    // Si hay un token guardado (el usuario está logueado), lo añadimos a la petición.
    if (token) {
        const authReq = req.clone({
            setHeaders: {
                // Formato estándar: 'Bearer <token>'
                Authorization: `Bearer ${token}`
            }
        });
        // IMPORTANTE: Las peticiones en Angular son inmutables, por eso usamos .clone()
        return next(authReq);
    }

    // Si no hay token, la petición sigue su curso normal (ej: para el propio login)
    return next(req);
};
