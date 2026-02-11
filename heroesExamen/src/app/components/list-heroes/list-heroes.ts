import { Component, inject } from '@angular/core';
import { InterfaceHeroe } from '../../interface/interface-heroe';
import { ServiceHeroes } from '../../service/service-heroes';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list-heroes',
  imports: [RouterLink, NgFor],
  templateUrl: './list-heroes.html',
  styleUrl: './list-heroes.css',
})
export class ListHeroes {
  // Inyección de servicios necesarios
  private serviceHeroes = inject(ServiceHeroes);
  private router = inject(Router);

  // VARIABLES DE CONTROL DE PAGINACIÓN
  // Estas variables mantienen sincronizada la interfaz con el estado del servidor.
  public listaHeroes: InterfaceHeroe[] = []; // Los héroes de la página actual
  public currentPage: number = 0;           // Página que estamos viendo (0 es la primera)
  public totalPages: number = 0;            // Cuántas páginas existen en total (lo dice el backend)
  public isFirstPage: boolean = true;       // ¿Estamos al principio? (para bloquear botón 'Anterior')
  public isLastPage: boolean = false;        // ¿Estamos al final? (para bloquear botón 'Siguiente')

  constructor() { }

  ngOnInit(): void {
    this.loadHeroes();
  }

  /**
   * SISTEMA DE CARGA DINÁMICA:
   * Cada vez que cambiamos de página, este método pide al servicio solo los héroes de esa página.
   */
  async loadHeroes() {
    try {
      // Pedimos al servidor la página actual con un tamaño fijo de 8 héroes
      const response = await this.serviceHeroes.getAllHeroes(this.currentPage, 8);

      // El objeto 'response' del backend (Page de Spring Data) contiene:
      this.listaHeroes = response.content;   // La lista real de héroes (máximo 8)
      this.totalPages = response.totalPages; // Total de páginas disponibles
      this.isFirstPage = response.first;      // Booleano: true si es la pág 0
      this.isLastPage = response.last;        // Booleano: true si no hay más páginas
    } catch (error) {
      console.error('Error loading heroes:', error);
      Swal.fire('Error', 'No se pudieron cargar los héroes', 'error');
    }
  }

  /**
   * NAVEGACIÓN ANTERIOR:
   * Decrementa el contador y refresca la lista.
   */
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadHeroes(); // Volvemos a llamar al servidor con la nueva página
    }
  }

  /**
   * NAVEGACIÓN SIGUIENTE:
   * Incrementa el contador y refresca la lista, siempre que no estemos en la última.
   */
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadHeroes(); // Volvemos a llamar al servidor con la nueva página
    }
  }

  /**
   * Procesa el borrado de un héroe con confirmación previa.
   * @param id ID del héroe a eliminar
   */
  deleteHero(id: number | undefined) {
    if (!id) return;

    // Diálogo de confirmación con SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórralo!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      // Si el usuario confirma, procedemos al borrado
      if (result.isConfirmed) {
        try {
          await this.serviceHeroes.deleteHeroe(id);
          Swal.fire(
            '¡Eliminado!',
            'El héroe ha sido eliminado correctamente.',
            'success'
          );
          // Recargamos la lista para reflejar los cambios
          this.loadHeroes();
        } catch (error) {
          Swal.fire('Error', 'No se pudo eliminar al héroe', 'error');
        }
      }
    });
  }
}
