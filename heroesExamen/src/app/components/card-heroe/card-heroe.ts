import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceHeroes } from './../../service/service-heroes';
import { Component, EventEmitter, inject, Input, input, Output, output } from '@angular/core';
import { InterfaceHeroe } from '../../interface/interface-heroe';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-card-heroe',
  imports: [RouterLink],
  templateUrl: './card-heroe.html',
  styleUrl: './card-heroe.css',
})
export class CardHeroe {
  ServiceHeroes = inject(ServiceHeroes);
  Router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  @Input() heroe!: InterfaceHeroe;
  @Output() delete = new EventEmitter<InterfaceHeroe>();

  ngOnInit(): void {
      //Usando el endpoint específico para obtener usuario por id
      this.activatedRoute.params.subscribe(async (params: any) => {

        //!id: string si uuid numer si id simple
        let id: string = params.id

        if (id != undefined) {
          let response = await this.ServiceHeroes.getHeroeById(id);
        }

      });

    }

  async eliminarHeroe() {

    const result = await Swal.fire({title: `¿Quieres eliminar a ${this.heroe.name}?`,
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    });

    if (result.isConfirmed) {
      await this.ServiceHeroes.deleteHeroe(this.heroe.id!);

    Swal.fire({
      title: "Eliminado",
        text: `Has eliminado a ${this.heroe.name}`,
        icon: "success"
    });
  }

  }

}
