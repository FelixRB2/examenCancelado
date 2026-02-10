import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { loginGuards } from './guards/login-guards';
import { ListHeroes } from './components/list-heroes/list-heroes';
import { FormularioHeroe } from './pages/formulario-heroe/formulario-heroe';
import { DetallesHeroe } from './pages/detalles-heroe/detalles-heroe';

export const routes: Routes = [

    {path:'', pathMatch: 'full', redirectTo: 'landingPage'},

    {path: 'landingPage', component: LandingPage},

    {path: 'login', component: Login},

    {
        path: 'home', component: Home, canActivate: [loginGuards], children: [

            {path:'', component: ListHeroes},
            {path:'nuevoHeroe', component: FormularioHeroe},
            {path:'heroe/:id', component: DetallesHeroe},
            {path:'formulario/:id', component: FormularioHeroe},

        ]
    },

    {path: "**", redirectTo: "landingPage"}


];
