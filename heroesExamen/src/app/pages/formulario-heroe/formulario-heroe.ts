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
  private fb = inject(FormBuilder);
  private serviceHeroes = inject(ServiceHeroes);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  heroForm: FormGroup;
  isEditMode: boolean = false;
  heroId?: number;

  constructor() {
    this.heroForm = this.fb.group({
      id: [null],
      heroname: ['', Validators.required],
      fullname: ['', Validators.required],
      image1: ['', Validators.required],
      image2: [''],
      image3: [''],
      gender: ['', Validators.required],
      race: ['', Validators.required],
      alignment: ['', Validators.required],
      powerstats: this.fb.group({
        id: [null],
        intelligence: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
        strength: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
        speed: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
        durability: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
        power: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
        combat: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      })
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.heroId = +id;
      this.loadHero(id);
    }
  }

  async loadHero(id: string) {
    try {
      const hero = await this.serviceHeroes.getHeroeById(id);
      this.heroForm.patchValue(hero);
    } catch (error) {
      console.error('Error loading hero', error);
      Swal.fire('Error', 'Could not load hero details', 'error');
    }
  }

  async submit() {
    if (this.heroForm.invalid) {
      return;
    }

    const hero: InterfaceHeroe = this.heroForm.value;

    try {
      if (this.isEditMode) {
        await this.serviceHeroes.updateHeroe(hero);
        Swal.fire('Success', 'Hero updated successfully', 'success');
      } else {
        await this.serviceHeroes.insertHeroe(hero);
        Swal.fire('Success', 'Hero created successfully', 'success');
      }
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error saving hero', error);
      Swal.fire('Error', 'Could not save hero', 'error');
    }
  }
}
