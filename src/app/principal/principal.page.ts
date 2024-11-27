import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import * as QRCode from 'qrcode'; // Importamos la librería para generar códigos QR

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  username: string = "";
  menuOpen: boolean = false;
  selectedClass: string = '';
  qrCodeData: string = '';  // Almacena los datos que se usarán para el código QR
  qrCodeUrl: string = '';   // Almacena la URL del QR generado

  constructor(private route: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invitado';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Función para seleccionar una clase y generar el código QR
  seleccionarClase(clase: string) {
    this.selectedClass = clase;
    this.qrCodeData = `Asistencia para la clase de ${clase}`; // Datos para el código QR
    this.menuOpen = false; 

    // Llamamos a la función que generará el QR con los datos
    this.generarCodigoQR(this.qrCodeData);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invitado';
  }

  deseleccionarClase() {
    this.selectedClass = '';
    this.qrCodeData = '';
    this.qrCodeUrl = ''; // Limpiamos el QR
  }

  logout() {
    localStorage.setItem('ingresado', 'false');
    this.navCtrl.navigateRoot('/home'); 
  }

  // Función para generar el código QR
  async generarCodigoQR(data: string) {
    try {
      this.qrCodeUrl = await QRCode.toDataURL(data); // Genera el QR como una URL de imagen
    } catch (error) {
      console.error('Error al generar el QR: ', error);
    }
  }
}