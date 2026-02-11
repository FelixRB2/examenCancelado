import { Component, inject } from '@angular/core';
import { InterfaceHeroe } from '../../interface/interface-heroe';
import { ServiceHeroes } from '../../service/service-heroes';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list-heroes',
  imports: [RouterLink, NgFor],
  templateUrl: './list-heroes.html',
  styleUrl: './list-heroes.css',
})
export class ListHeroes {
  private serviceHeroes = inject(ServiceHeroes);

  heroes: InterfaceHeroe[] = [];
  currentPage: number = 0;
  pageSize: number = 9; // Display 9 per page for a 3x3 grid
  totalPages: number = 0;
  isLastPage: boolean = false;

  ngOnInit(): void {
    this.loadHeroes();
  }

  async loadHeroes() {
    try {
      console.log('Loading heroes...');
      const response = await this.serviceHeroes.getAllHeroes(this.currentPage, this.pageSize);
      console.log('Heroes response:', response);
      this.heroes = response.content;
      this.totalPages = response.totalPages;
      this.isLastPage = response.last;
    } catch (error) {
      console.error('Error loading heroes:', error);
      Swal.fire('Error', 'Could not load heroes', 'error');
    }
  }

  nextPage() {
    if (!this.isLastPage) {
      this.currentPage++;
      this.loadHeroes();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadHeroes();
    }
  }

  deleteHero(id: number | undefined) {
    if (!id) return;

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this.serviceHeroes.deleteHeroe(id);
          Swal.fire(
            'Deleted!',
            'Your hero has been deleted.',
            'success'
          );
          this.loadHeroes(); // Reload list
        } catch (error) {
          Swal.fire('Error', 'Could not delete hero', 'error');
        }
      }
    });
  }
}
