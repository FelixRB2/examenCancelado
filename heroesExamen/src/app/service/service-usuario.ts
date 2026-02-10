import { InterfaceUsuario } from './../interface/interface-usuario';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class ServiceUsuario {

  private baseUrl: string = 'http://localhost:8085/api/login'

  httpClient = inject(HttpClient);

  constructor() {}

  login(user: InterfaceUsuario ): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl + "login", user));

  }
  
}
