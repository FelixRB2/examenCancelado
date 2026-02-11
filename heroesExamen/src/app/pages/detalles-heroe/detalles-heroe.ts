import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InterfaceHeroe } from '../../interface/interface-heroe';
import { ServiceHeroes } from '../../service/service-heroes';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalles-heroe',
  imports: [RouterLink],
  templateUrl: './detalles-heroe.html',
  styleUrl: './detalles-heroe.css',
})
export class DetallesHeroe implements OnInit {
  // Servicios inyectados
  private serviceHeroes = inject(ServiceHeroes);
  private activatedRoute = inject(ActivatedRoute);

  // Propiedad para almacenar los datos del héroe actual
  hero: InterfaceHeroe | undefined;

  constructor() { }

  /**
   * Al inicializar, extraemos el ID del héroe de la URL
   * y solicitamos sus detalles completos al servidor.
   */
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.loadHeroDetails(id);
    }
  }

  /**
   * Recupera la información del héroe por su ID.
   * Si hay un error, muestra una alerta al usuario.
   * @param id Identificador del héroe
   */
  async loadHeroDetails(id: string) {
    try {
      this.hero = await this.serviceHeroes.getHeroeById(id);
    } catch (error) {
      console.error('Error loading hero details', error);
      Swal.fire('Error', 'No se pudieron cargar los detalles del héroe', 'error');
    }
  }

  /**
   * Determina el color de la barra de progreso según el valor de la estadística.
   * @param value Nivel de la estadística (0-100)
   * @returns Clase CSS de Bootstrap para el color
   */
  getStatColor(value: number | undefined): string {
    const val = value || 0;
    if (val < 30) return 'bg-danger';  // Nivel bajo
    if (val < 70) return 'bg-warning'; // Nivel medio
    return 'bg-success';               // Nivel alto
  }
}
