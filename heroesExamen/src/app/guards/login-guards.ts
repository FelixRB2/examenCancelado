import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ServiceUsuario } from "../service/service-usuario";

/**
 * EXPLICACIÓN DEL GUARD (SEGURIDAD DE RUTAS):
 * Es un guardián que decide si un usuario puede o no entrar en una ruta específica.
 * Se configura en 'app.routes.ts' mediante la propiedad 'canActivate'.
 */
export const loginGuards: CanActivateFn = (route, state) => {
    const serviceUsuario = inject(ServiceUsuario);
    const router = inject(Router);

    // CONTROL DE ACCESO:
    // Comprueba si existe el token en el navegador (isLoggedIn).
    if (serviceUsuario.isLoggedIn()) {
        // Si el token existe, permitimos el paso a la página solicitada (home, detalles, etc.)
        return true;
    } else {
        // PROTECCIÓN: Si el usuario intenta entrar "por la fuerza" escribiendo la URL, 
        // lo redirigimos automáticamente a la página de bienvenida.
        router.navigate(['/landingPage']);
        return false;
    }
};