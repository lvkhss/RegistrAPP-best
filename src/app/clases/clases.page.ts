import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ClasesService } from '../services/clases.service';
import html2canvas from 'html2canvas';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  clases: any[] = [];
  cursoId!: number;
  qrTexts: { [key: number]: string } = {};  // Objeto para almacenar los QR por ID de clase
  nuevaClase = {
    fecha: '',
    hora_inicio: '',
    hora_termino: ''
  };

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private authService: AuthService,
    private clasesService: ClasesService,
    private navController: NavController,
    private platform: Platform,
  ) {}

  ngOnInit() {
    this.cursoId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerClases();
  }

  async obtenerClases() {
    const token = await this.authService.getToken();
    if (token) {
      this.clasesService.getClases(this.cursoId, token).subscribe(
        (response: any) => {
          this.clases = response.clases;
          this.clases.forEach((clase) => {
            this.qrTexts[clase.id] = clase.codigo_web; // Asigna el valor de codigo_web a cada clase
          });
        },
        (error: any) => {
          console.error('Error al obtener las clases:', error);
        }
      );
    } else {
      console.error('Error: Token invalido o expiró');
    }
  }

  generateQRCode(claseId: number) {
    this.captureScreen(claseId);
}

captureScreen(claseId: number) {
    const element = document.getElementById(`qrImage-${claseId}`) as HTMLElement;
    html2canvas(element).then((canvas: HTMLCanvasElement) => {
        // Aquí no se realiza ninguna acción adicional, solo se captura la imagen del QR.
        // Si quieres realizar alguna otra acción con el canvas (como mostrarlo en pantalla o almacenarlo),
        // lo puedes hacer aquí.
    });
}
async crearClase() {
  const token = await this.authService.getToken();
  if (token) {
    const claseData = {
      fecha: this.nuevaClase.fecha,
      hora_inicio: this.nuevaClase.hora_inicio,
      hora_termino: this.nuevaClase.hora_termino
    };

    this.clasesService.crearClase(this.cursoId, claseData, token).subscribe(
      (response: any) => {
        console.log('Clase creada:', response);
        this.obtenerClases(); // Actualiza la lista de clases
        // Resetea el formulario
        this.nuevaClase = {
          fecha: '',
          hora_inicio: '',
          hora_termino: ''
        };
      },
      (error: any) => {
        console.error('Error al crear la clase:', error);
      }
    );
  } else {
    console.error('Error: Token invalido o expiró');
  }
}

  goBack() {
    this.navController.pop(); // Retrocede a la página anterior
  }
}