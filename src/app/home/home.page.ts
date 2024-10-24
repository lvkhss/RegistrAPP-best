import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

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
    private databaseService: DatabaseService 
  ) {}

  login() {
    // Llamar al servicio para autenticar con la API
    this.databaseService.login(this.usuario, this.password).subscribe(
      (response) => {
        console.log('Login exitoso:', response);

        // Si el login es exitoso, puedes almacenar el token o la información del usuario
        localStorage.setItem('token', response.token);  // Suponiendo que la API devuelva un token

        // Navegar a la página principal
        this.router.navigate(['/principal'], { queryParams: { nombre: this.usuario } });
        localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateRoot('/principal');
      },
      (error) => {
        console.error('Error en el login:', error);
        // Mostrar un mensaje de error en la interfaz (por ejemplo, un alert o toast)
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
