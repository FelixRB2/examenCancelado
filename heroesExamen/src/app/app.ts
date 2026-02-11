import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente Raíz de la aplicación.
 * Sirve como contenedor principal que carga el RouterOutlet para la navegación.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Título de la aplicación (usando Signals de Angular 17/18)
  protected readonly title = signal('DC Universe Manager');
}
