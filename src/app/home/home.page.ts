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
  errorMessage: string = '';

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private presenteprofeService: PresenteprofeService,
    private authService: AuthService 
  ) {}

  // Método para iniciar sesión utilizando la API
  login() {
    if (!this.usuario || !this.password) {
      // Si alguno de los campos está vacío, se muestra un mensaje de error
      this.errorMessage = 'Campos incompletos.';
    } else {
      // Si ambos campos tienen valores, se procede a autenticar
      this.errorMessage = '';  // Limpiar cualquier mensaje de error previo
      this.goToAut();    // Llamar al método de autenticación
    }
  }
  // Método para autenticar y navegar al dashboard
  goToAut() {
    const credentials = {
      correo: this.usuario,  
      password: this.password,
    };
  
    // Llamar al servicio de autenticación
    this.authService.authenticate(credentials).subscribe(
      async (response) => {
        console.log('Respuesta de autenticación:', response);  
  
        await this.authService.saveToken(response.auth.token);
  
        // Obtén el perfil del usuario desde la respuesta
        const perfil = response.perfil;
        const username = response.data.nombre_completo || 'Invitado';
        
        //Verifica los datos del usuario
        console.log('Perfil del usuario:', perfil);  
        console.log('Nombre del usuario:', username); 
  
        // Navegar según el perfil del usuario
        if (perfil === 'estudiante') {
          this.navCtrl.navigateForward(['/principal-estudiantes', { usuario: username }]);
        } else if (perfil === 'docente') {
          this.navCtrl.navigateForward(['/principal', { usuario: username }]);
        } 
      },
      (error) => {
        console.error('Error de autenticación:', error);
        this.errorMessage = 'Usuario o contraseña incorrecta.';
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
