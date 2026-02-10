import { LandingPage } from './../../pages/landing-page/landing-page';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  
private router = inject(Router);


  get isToken(): boolean {
    return !localStorage.getItem('accessToken');
    this.router.navigate(['/LandingPage']);
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/LandingPage']);
  }
}
