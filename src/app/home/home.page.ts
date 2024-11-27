import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PresenteprofeService } from '../services/presenteprofe.service'; // Importar el servicio

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private presenteprofeService: PresenteprofeService // Inyectar el servicio
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

  goToRecuperar() {
    console.log('click');
    this.router.navigate(['/recuperar']);
  }

  goToRegister() {
    console.log('click');
    this.router.navigate(['/register']);
  }
}
