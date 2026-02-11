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

  /**
   * Al inicializar, si el usuario ya tiene sesión iniciada,
   * lo enviamos directamente al dashboard (home).
   */
  ngOnInit(): void {
    if (this.serviceUsuario.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  /**
   * EXPLICACIÓN DEL PROCESO DE ACCESO:
   * Este método gestiona la interacción del usuario con el formulario de login.
   * 1. Recoge los datos del formulario (NgForm).
   * 2. Llama al servicio para validar las credenciales contra el servidor.
   * 3. Si el servidor devuelve un Token, notificamos al usuario con SweetAlert2 y saltamos al panel principal.
   */
  async getUsuario(loginForm: NgForm) {
    // Convertimos los campos del formulario al formato que espera el backend
    const loginUser: LoginRequest = loginForm.value as LoginRequest;

    try {
      const response = await this.serviceUsuario.login(loginUser);

      if (response && response.token) {
        // FEEDBACK VISUAL: Usamos SweetAlert2 para una experiencia de usuario premium
        Swal.fire({
          title: "¡Acceso Autorizado!",
          text: "Bienvenido al sistema de gestión de DC Universe",
          icon: "success",
          timer: 2000, // Se cierra solo tras 2 segundos
          showConfirmButton: false
        });

        // NAVEGACIÓN: Una vez logueado, redirigimos a la ruta protegida '/home'
        this.router.navigate(['/home']);
        loginForm.reset();
      }
    } catch (error) {
      // GESTIÓN DE ERRORES: Si las credenciales fallan, el backend devuelve un error 401/403.
      Swal.fire({
        title: "Error de Acceso",
        text: "El usuario o la contraseña no son correctos. Por favor, inténtalo de nuevo.",
        icon: "error"
      });
      loginForm.reset();
    }
  }

}
