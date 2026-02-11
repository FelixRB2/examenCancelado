import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ServiceUsuario } from '../../service/service-usuario';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private serviceUsuario = inject(ServiceUsuario);

  logout() {
    this.serviceUsuario.logout();
  }
}
