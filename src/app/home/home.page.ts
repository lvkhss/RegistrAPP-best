import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PresenteprofeService } from '../services/presenteprofe.service'; // Importar el servicio
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';
  password: string = '';
  mensajeError: string = '';

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private presenteprofeService: PresenteprofeService,
    private authService: AuthService 
  ) {}

  // Método para iniciar sesión utilizando la API
  login() {
    this.presenteprofeService.login(this.usuario, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Aquí puedes manejar la respuesta, guardar el token, redirigir, etc.
        this.router.navigate(['/principal'], { queryParams: { nombre: this.usuario } });
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Mostrar un mensaje de error al usuario si algo sale mal
      },
    });
  }

  // Método para autenticar y navegar al dashboard
  goToDashboard() {
    const credentials = {
      correo: this.usuario,  
      password: this.password,
    };

    // Llamar al servicio de autenticación
    this.authService.authenticate(credentials).subscribe(
      async (response) => {
        console.log('Respuesta de autenticación:', response);

        // Guarda el token en el almacenamiento si la autenticación es exitosa
        await this.authService.saveToken(response.auth.token);



        // Obtén el perfil del usuario desde la respuesta
      const perfil = response.perfil;
      const username = response.data.nombre_completo || 'Invitado';

        // Navegar según el perfil del usuario
      if (perfil === 'estudiante') {
        // Navegar a la vista para estudiantes
        this.navCtrl.navigateForward(['/dashboard', { usuario: username }]);
      } else if (perfil === 'docente') {
        // Navegar a la vista para profesores
        this.navCtrl.navigateForward(['/dashboard-profe', { usuario: username }]);
      } else {
        // Manejar otros perfiles o redirigir a una vista genérica
        this.navCtrl.navigateForward(['/dashboard', { usuario: username }]);
      }
    },
    (error) => {
      console.error('Error de autenticación:', error);
      // Muestra un mensaje de error si la autenticación falla
      this.mensajeError = 'Usuario o contraseña incorrecta.';
    }
    );
  }


  goToRecuperar() {
    console.log('click');
    this.router.navigate(['/recuperar']);
  }

  goToRegister() {
    console.log('click');
    this.router.navigate(['/register']);
  }
}
