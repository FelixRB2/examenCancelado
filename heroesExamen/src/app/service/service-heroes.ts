import { InterfaceHeroe } from './../interface/interface-heroe';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceHeroes {
  // URL base para las peticiones de personajes al backend
  private baseUrl: string = '/api/characters'

  httpClient = inject(HttpClient);

  constructor() { }

  /**
   * EXPLICACIÓN DE LA PAGINACIÓN:
   * Este método solicita al backend una "rebanada" (página) de los datos en lugar de traerlos todos de golpe.
   * 1. 'page': Indica qué número de página queremos (el servidor empieza a contar en 0).
   * 2. 'size': Indica cuántos registros queremos ver por cada página.
   * El backend de Spring Boot procesa estos 'query params' y devuelve un objeto 'Page' con los datos y metadatos.
   */
  getAllHeroes(page: number = 0, size: number = 8): Promise<any> {
    // La URL resultante será algo como: /api/characters?page=0&size=8
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${page}&size=${size}`));
  }

  /**
   * Obtiene un personaje específico por su ID.
   * @param id Identificador único del personaje
   */
  getHeroeById(id: string): Promise<InterfaceHeroe> {
    return lastValueFrom(this.httpClient.get<InterfaceHeroe>(`${this.baseUrl}/${id}`));
  }

  /**
   * Busca personajes que tengan un nivel de poder mínimo.
   * @param minPower Valor de poder para el filtro
   */
  getHeroeByPoder(minPower: number): Promise<InterfaceHeroe[]> {
    return lastValueFrom(this.httpClient.get<InterfaceHeroe[]>(`${this.baseUrl}/power/${minPower}`));
  }

  /**
   * Busca personajes por su nombre completo o de héroe.
   * @param name Nombre o parte del nombre a buscar
   */
  getHeroeByNombre(name: string): Promise<InterfaceHeroe[]> {
    return lastValueFrom(this.httpClient.get<InterfaceHeroe[]>(`${this.baseUrl}/name/${name}`));
  }

  /**
   * Inserta un nuevo personaje en la base de datos.
   * @param hero Objeto con los datos del nuevo héroe
   */
  insertHeroe(hero: InterfaceHeroe): Promise<InterfaceHeroe> {
    return lastValueFrom(this.httpClient.post<InterfaceHeroe>(this.baseUrl, hero));
  }

  /**
   * Actualiza los datos de un personaje existente.
   * @param hero Objeto del héroe con los datos actualizados (debe incluir ID)
   */
  updateHeroe(hero: InterfaceHeroe): Promise<InterfaceHeroe> {
    return lastValueFrom(this.httpClient.put<InterfaceHeroe>(this.baseUrl, hero));
  }

  /**
   * Elimina un personaje por su ID.
   * @param id Identificador del personaje a borrar
   */
  deleteHeroe(id: number): Promise<void> {
    return lastValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/${id}`));
  }

}
