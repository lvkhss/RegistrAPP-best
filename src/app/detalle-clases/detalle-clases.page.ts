import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClasesService } from '../services/clases.service';
import { NavController } from '@ionic/angular';
import html2canvas from 'html2canvas';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-detalle-clases',
  templateUrl: './detalle-clases.page.html',
  styleUrls: ['./detalle-clases.page.scss'],
})
export class DetalleClasesPage implements OnInit {

  curso: any;  // Aquí almacenaremos los detalles del curso
  apiUrl = 'https://www.presenteprofe.cl/api/v1/cursos'; // Base URL de la API
  clases: any[] = [];
  qrText: string = ''; // Texto que se usará para el QR

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient,
    private ClasesService: ClasesService,
    private navController: NavController,
    private loadingController: LoadingController,
    private platform: Platform,
  ) {}

  async ngOnInit() {
    // Obtener el ID del curso de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerDetalleCurso(id);
    }
  }

  // Método para obtener los detalles del curso
  async obtenerDetalleCurso(id: string) {
    const token = await this.authService.getToken();
    if (!token) {
      console.error('Token no encontrado.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    try {
      const response = await this.http.get(`${this.apiUrl}/${id}`, { headers }).toPromise();
      this.curso = (response as any).curso;  // Almacenar el curso en la variable
      this.qrText = this.curso.codigo_web || ''; // Asignar el código QR del curso
    } catch (error) {
      console.error('Error al obtener detalles del curso:', error);
    }
  }

  // Método para ver las clases de un curso
  async verClases(cursoId: number) {
    const token = await this.authService.getToken();
    if (token) {
      this.ClasesService.getClases(cursoId, token).subscribe(
        (response: any) => {
          this.clases = response.clases;
          console.log('Clases del curso:', this.clases);
        },
        (error) => {
          console.error('Error al obtener las clases:', error);
        }
      );
    } else {
      console.error('Token no encontrado.');
    }
  }

  // Método para compartir la imagen del QR
  captureScreen() {
    const element = document.getElementById('qrImage') as HTMLElement;
    html2canvas(element).then((canvas: HTMLCanvasElement) => {
      if (this.platform.is('capacitor')) {
        this.shareImage(canvas);
      } else {
        this.downloadImage(canvas);
      }
    });
  }

  // Descargar la imagen QR generada
  downloadImage(canvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();
  }

  // Compartir la imagen QR en dispositivos móviles
  async shareImage(canvas: HTMLCanvasElement) {
    let base64 = canvas.toDataURL();
    let path = 'qr.png';
    const loading = await this.loadingController.create({ spinner: 'crescent' });
    await loading.present();

    await Filesystem.writeFile({ path, data: base64, directory: Directory.Cache }).then(async (res) => {
      let uri = res.uri;
      await Share.share({ url: uri });
      await Filesystem.deleteFile({ path, directory: Directory.Cache });
    }).finally(() => {
      loading.dismiss();
    });
  }

  // Función para retroceder a la página anterior
  goBack() {
    this.navController.pop(); // Retrocede a la página anterior
  }
}
