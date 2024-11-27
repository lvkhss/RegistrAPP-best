import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';  // Asegúrate de importar LoadingController y ToastController
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';  // Asegúrate de tener este servicio para obtener el token

@Component({
  selector: 'app-principal-estudiantes',
  templateUrl: './principal-estudiantes.page.html',
  styleUrls: ['./principal-estudiantes.page.scss'],
})
export class PrincipalEstudiantesPage implements OnInit {
  username: string = '';
  isSupported = false;
  barcodes: Barcode[] = [];


  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private http: HttpClient,
    private authService: AuthService,
    private loadingController: LoadingController, 
    private toastController: ToastController
  ) {}

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
    
    if (this.barcodes.length > 0) {
      const scanResult = this.barcodes[0]?.displayValue; 
      if (scanResult) {
        await this.registrarAsistencia(scanResult);
      }
    }
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

  // Función para registrar asistencia usando la API
  async registrarAsistencia(code: string) {
    const loading = await this.loadingController.create({
      message: 'Validando asistencia...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const token = await this.authService.getToken();
      if (!token) throw new Error('Token no encontrado. Inicia sesión nuevamente.');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });

      // Realiza la solicitud POST a la API de PresenteProfesor para registrar la asistencia
      await this.http.post(`https://www.presenteprofe.cl/api/v1/clases/${code}/asistencia`, {}, { headers }).toPromise();
      await this.showToast('Asistencia registrada exitosamente');
    } catch (error) {
      await this.showToast('Error al registrar asistencia: ' + ((error as any).message || error));
    } finally {
      await loading.dismiss();
    }
  }

  // Función para mostrar un mensaje de Toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  logout() {
    localStorage.setItem('ingresado', 'false');
    this.navCtrl.navigateRoot('/home');
  }
}
