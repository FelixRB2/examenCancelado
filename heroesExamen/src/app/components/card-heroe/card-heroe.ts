import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceHeroes } from './../../service/service-heroes';
import { Component, EventEmitter, inject, Input, input, Output, output } from '@angular/core';
import { InterfaceHeroe } from '../../interface/interface-heroe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-heroe',
  imports: [RouterLink],
  templateUrl: './card-heroe.html',
  styleUrl: './card-heroe.css',
})
export class CardHeroe {
  // Inyección de servicios
  ServiceHeroes = inject(ServiceHeroes);
  Router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  // Entrada de datos del héroe desde el padre (ListHeroes)
  @Input() heroe!: InterfaceHeroe;
  // Evento de salida para notificar cambios (opcional en este flujo)
  @Output() delete = new EventEmitter<InterfaceHeroe>();

  ngOnInit(): void {
    // Suscripción a cambios de parámetros en caso de que este componente 
    // se usara de forma independiente por ruta (legacy support).
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id: string = params.id
      if (id != undefined) {
        await this.ServiceHeroes.getHeroeById(id);
      }
    });
  }

  /**
   * Ejecuta la eliminación de un héroe con diálogo de confirmación.
   */
  async eliminarHeroe() {
    const result = await Swal.fire({
      title: `¿Quieres eliminar a ${this.heroe.heroname}?`,
      text: "Esta acción no se puede deshacer de forma sencilla",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    });

    if (result.isConfirmed) {
      if (this.heroe.id) {
        try {
          // Llamada al servicio para borrar en el backend
          await this.ServiceHeroes.deleteHeroe(this.heroe.id);
          Swal.fire({
            title: "Eliminado",
            text: `Has eliminado a ${this.heroe.heroname} con éxito`,
            icon: "success"
          });
          // Nota: El componente ListHeroes recarga la lista tras la confirmación de borrado.
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar al héroe", "error");
        }
      }
    }
  }
}
