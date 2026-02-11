import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { loginGuards } from './guards/login-guards';
import { ListHeroes } from './components/list-heroes/list-heroes';
import { FormularioHeroe } from './pages/formulario-heroe/formulario-heroe';
import { DetallesHeroe } from './pages/detalles-heroe/detalles-heroe';

/**
 * Definición de las rutas de navegación de la aplicación.
 * Organizado jerárquicamente con protección mediante Guards.
 */
export const routes: Routes = [

    // Redirección inicial a la página de bienvenida
    { path: '', pathMatch: 'full', redirectTo: 'landingPage' },

    // Página de bienvenida pública
    { path: 'landingPage', component: LandingPage },

    // Página de acceso (Login)
    { path: 'login', component: Login },

    // Sección Dashboard (Home): Protegida por loginGuards
    {
        path: 'home', component: Home, canActivate: [loginGuards], children: [
            // Rutas hijas que se cargan dentro del router-outlet de Home
            { path: '', component: ListHeroes },                       // Listado por defecto
            { path: 'nuevoHeroe', component: FormularioHeroe },        // Crear héroe
            { path: 'heroe/:id', component: DetallesHeroe },           // Ver detalle (ID)
            { path: 'formulario/:id', component: FormularioHeroe },    // Editar héroe (ID)
        ]
    },

    // Ruta comodín para capturar URLs inexistentes y redirigir
    { path: "**", redirectTo: "landingPage" }
];
