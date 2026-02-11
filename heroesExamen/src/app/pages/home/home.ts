import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ServiceUsuario } from '../../service/service-usuario';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private serviceUsuario = inject(ServiceUsuario);

  logout() {
    this.serviceUsuario.logout();
  }
}
