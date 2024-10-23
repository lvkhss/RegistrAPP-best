import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-principal-estudiantes',
  templateUrl: './principal-estudiantes.page.html',
  styleUrls: ['./principal-estudiantes.page.scss'],
})
export class PrincipalEstudiantesPage implements OnInit {
  username: string = '';
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController, private navCtrl: NavController) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invitado';
    this.checkBarcodeSupport();
  }

  async checkBarcodeSupport() {
    const result = await BarcodeScanner.isSupported();
    this.isSupported = result.supported;
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.showPermissionAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async showPermissionAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso Denegado',
      message: 'Para usar la cámara, debes dar los permisos correspondientes.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  logout() {
    localStorage.setItem('ingresado', 'false');
    this.navCtrl.navigateRoot('/home'); 
  }
}