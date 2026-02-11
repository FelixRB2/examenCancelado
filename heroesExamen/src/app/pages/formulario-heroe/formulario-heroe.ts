import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceHeroes } from '../../service/service-heroes';
import { InterfaceHeroe } from '../../interface/interface-heroe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-heroe',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-heroe.html',
  styleUrl: './formulario-heroe.css',
})
export class FormularioHeroe implements OnInit {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private serviceHeroes = inject(ServiceHeroes);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  // Definición del formulario reactivo con validaciones
  heroForm: FormGroup = this.fb.group({
    id: [null],
    heroname: ['', [Validators.required]],
    fullname: ['', [Validators.required]],
    gender: ['Male'],
    race: [''],
    alignment: ['Good'],
    publisher: ['DC Comics'],
    image1: [''],
    image2: [''],
    image3: [''],
    // Grupo anidado para las estadísticas de poder
    powerstats: this.fb.group({
      id: [null],
      intelligence: [50, [Validators.min(0), Validators.max(100)]],
      strength: [50, [Validators.min(0), Validators.max(100)]],
      speed: [50, [Validators.min(0), Validators.max(100)]],
      durability: [50, [Validators.min(0), Validators.max(100)]],
      power: [50, [Validators.min(0), Validators.max(100)]],
      combat: [50, [Validators.min(0), Validators.max(100)]],
    }),
  });

  // Flag para saber si estamos editando o creando un nuevo héroe
  isEditMode = false;

  /**
   * Al iniciar, comprobamos si hay un ID en la ruta.
   * Si lo hay, activamos el modo edición y cargamos los datos del héroe.
   */
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadHero(id);
    }
  }

  /**
   * Carga los datos de un héroe para rellenar el formulario de edición.
   * @param id ID del héroe a editar
   */
  async loadHero(id: string) {
    try {
      const hero = await this.serviceHeroes.getHeroeById(id);
      this.heroForm.patchValue(hero);
    } catch (error) {
      console.error('Error loading hero', error);
      Swal.fire('Error', 'No se pudieron cargar los detalles del héroe', 'error');
    }
  }

  /**
   * Procesa el envío del formulario.
   * Distingue entre modo "Insertar" y modo "Actualizar".
   */
  async submit() {
    // Si el formulario no es válido, no hacemos nada
    if (this.heroForm.invalid) {
      return;
    }

    const hero: InterfaceHeroe = this.heroForm.value;

    try {
      if (this.isEditMode) {
        // Modo Edición: Actualizar registro existente
        await this.serviceHeroes.updateHeroe(hero);
        Swal.fire('Éxito', 'Héroe actualizado correctamente', 'success');
      } else {
        // Modo Creación: Insertar nuevo personaje
        await this.serviceHeroes.insertHeroe(hero);
        Swal.fire('Éxito', 'Héroe creado correctamente', 'success');
      }
      // Volvemos al dashboard tras el éxito
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error saving hero', error);
      Swal.fire('Error', 'No se pudo guardar el héroe', 'error');
    }
  }
}
