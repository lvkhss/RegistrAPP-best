import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { QrScannerService } from '../services/qr-scanner.service'; // Importa el servicio QrScannerService

@Component({
  selector: 'app-principal-estudiantes',
  templateUrl: './principal-estudiantes.page.html',
  styleUrls: ['./principal-estudiantes.page.scss'],
})
export class PrincipalEstudiantesPage implements OnInit {
  usuario: string = '';
  isSupported = false;

  constructor(
    private readonly qrScannerService: QrScannerService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private navCtrl: NavController,
    private http: HttpClient,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usuario = params['usuario'] ? params['usuario'] : 'Invitado';
    });
    this.checkBarcodeSupport();
  }

  async checkBarcodeSupport() {
    const result = await BarcodeScanner.isSupported();
    this.isSupported = result.supported;
  }

  // Método para escanear un código QR y registrar asistencia
  async scan(): Promise<void> {
    try {
      const barcodes = await this.qrScannerService.scan(); // Usa el servicio para escanear

      if (barcodes.length === 0) {
        await this.showToast('No se detectaron códigos QR');
        return;
      }

      // Procesa el primer código escaneado
      const scanResult = barcodes[0];
      if (scanResult) {
        await this.registrarAsistencia(scanResult); // Registra la asistencia con el resultado escaneado
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      await this.showToast('Error al escanear el código QR.');
    }
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
      console.error('Error al registrar asistencia:', error);
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
