import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InterfaceHeroe } from '../../interface/interface-heroe';
import { ServiceHeroes } from '../../service/service-heroes';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-detalles-heroe',
  imports: [RouterLink, NgIf],
  templateUrl: './detalles-heroe.html',
  styleUrl: './detalles-heroe.css',
})
export class DetallesHeroe implements OnInit {
  private route = inject(ActivatedRoute);
  private serviceHeroes = inject(ServiceHeroes);

  hero?: InterfaceHeroe;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadHero(id);
    }
  }

  async loadHero(id: string) {
    try {
      this.hero = await this.serviceHeroes.getHeroeById(id);
    } catch (error) {
      console.error('Error loading hero', error);
    }
  }
}
