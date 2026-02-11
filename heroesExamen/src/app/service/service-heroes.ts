import { InterfaceHeroe } from './../interface/interface-heroe';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceHeroes {
  private baseUrl: string = '/api/characters'

  httpClient = inject(HttpClient);

  constructor() { }

  getAllHeroes(page: number = 0, size: number = 100): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${page}&size=${size}`));
  }

  getHeroeById(id: string): Promise<InterfaceHeroe> {
    return lastValueFrom(this.httpClient.get<InterfaceHeroe>(`${this.baseUrl}/${id}`));
  }

  getHeroeByPoder(minPower: number): Promise<InterfaceHeroe[]> {
    // NOTE: Backend endpoint is /powerstats/power/{value} or /characters/power/{value}
    // Based on controller: @GetMapping("/characters/power/{value}")
    return lastValueFrom(this.httpClient.get<InterfaceHeroe[]>(`${this.baseUrl}/power/${minPower}`));
  }

  getHeroeByNombre(name: string): Promise<InterfaceHeroe[]> {
    // NOTE: Backend endpoint is /characters/name/{heroName}
    return lastValueFrom(this.httpClient.get<InterfaceHeroe[]>(`${this.baseUrl}/name/${name}`));
  }

  insertHeroe(hero: InterfaceHeroe): Promise<InterfaceHeroe> {
    return lastValueFrom(this.httpClient.post<InterfaceHeroe>(this.baseUrl, hero));
  }

  updateHeroe(hero: InterfaceHeroe): Promise<InterfaceHeroe> {
    return lastValueFrom(this.httpClient.put<InterfaceHeroe>(this.baseUrl, hero));
  }

  deleteHeroe(id: number): Promise<void> {
    return lastValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/${id}`));
  }

}
