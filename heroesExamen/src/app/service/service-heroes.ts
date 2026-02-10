import { InterfaceHeroe } from './../interface/interface-heroe';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceHeroes {
  private baseUrl: string = 'http://localhost:8085/api/characters'

  httpClient = inject(HttpClient);

  constructor() {}

  getAllHeroes(): Promise<InterfaceHeroe[]> {
    return lastValueFrom(this.httpClient.get<InterfaceHeroe[]>(this.baseUrl));
  }

  getHeroeById(id: string): Promise<InterfaceHeroe[]> {
    return lastValueFrom(this.httpClient.get<InterfaceHeroe[]>(this.baseUrl + "/" + id));
  }

  getHeroeByPoder(minPower: number): Promise<InterfaceHeroe[]> {
    return lastValueFrom(this.httpClient.get<InterfaceHeroe[]>(this.baseUrl + "/poder/" + minPower));
  }

  getHeroeByNombre(name: string): Promise<InterfaceHeroe[]> {
    return lastValueFrom(this.httpClient.get<InterfaceHeroe[]>(this.baseUrl + "/nombre/" + name));
  }

  insertHeroe(hero: InterfaceHeroe): Promise<InterfaceHeroe> {
    return lastValueFrom(this.httpClient.post<InterfaceHeroe>(this.baseUrl, hero));
  }

  updateHeroe(hero: InterfaceHeroe): Promise<InterfaceHeroe> {
    return lastValueFrom(this.httpClient.put<InterfaceHeroe>(this.baseUrl, hero));
  }

  deleteHeroe(id: string): Promise<InterfaceHeroe> {
    return lastValueFrom(this.httpClient.delete<InterfaceHeroe>(this.baseUrl + "/" + id));
  }
 
}
