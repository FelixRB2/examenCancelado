import { Router, RouterLink } from '@angular/router';
import { routes } from './../../app.routes';
import { ServiceUsuario } from './../../service/service-usuario';
import { Component, inject } from '@angular/core';
import { InterfaceUsuario } from '../../interface/interface-usuario';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private ServiceUsuario = inject(ServiceUsuario)
  private router = inject(Router)

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.router.navigate(['/home']);
    }
  }

  async getUsuario(loginForm: NgForm) {
    const loginUser: InterfaceUsuario = loginForm.value as InterfaceUsuario;

    try {
      let response = await this.ServiceUsuario.login(loginUser);

      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);

        localStorage.setItem("user", JSON.stringify(response.user))

        this.router.navigate(['/landingPage']);
        loginForm.reset();
      }
    }catch (error) {
    alert("credenciales incorrectos"); 
    loginForm.reset();
    }
  }

}
