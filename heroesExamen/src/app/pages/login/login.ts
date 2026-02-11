import { Router, RouterLink } from '@angular/router';
import { ServiceUsuario } from './../../service/service-usuario';
import { Component, inject } from '@angular/core';
import { LoginRequest } from '../../interface/interface-login';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private serviceUsuario = inject(ServiceUsuario)
  private router = inject(Router)

  ngOnInit(): void {
    if (this.serviceUsuario.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  async getUsuario(loginForm: NgForm) {
    const loginUser: LoginRequest = loginForm.value as LoginRequest;

    try {
      const response = await this.serviceUsuario.login(loginUser);

      if (response && response.token) {
        Swal.fire({
          title: "Success!",
          text: "Welcome back!",
          icon: "success"
        });
        this.router.navigate(['/home']);
        loginForm.reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Invalid username or password",
        icon: "error"
      });
      loginForm.reset();
    }
  }

}
