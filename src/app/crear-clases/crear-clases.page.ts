import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-crear-clases',
  templateUrl: './crear-clases.page.html',
  styleUrls: ['./crear-clases.page.scss'],
})
export class CrearClasesPage implements OnInit {
  usuario: string = "";
  selectedClass: string = '';
  programacionButtonVisible: boolean = false;
  userData: any = {};
  // valores de formulario
  curso: any = {
    nombre: '',
    sigla: '',
    institucion: '',
    descripcion: ''
  };

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usuario = params['usuario'] ? params['usuario'] : 'Invitado';
    });
  }

  async onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted', this.curso);
      
      // Obtén el token antes de enviar la solicitud
      const token = await this.authService.getToken();

      if (token) {
        // Llama al método para enviar el curso con el token
        this.postCurso(this.curso, token);
      } else {
        console.error('No se encontró el token');
      }
    }
  }

  postCurso(curso: any, token: string) {
    const url = 'https://www.presenteprofe.cl/api/v1/cursos';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Agregar el token al encabezado
      'Content-Type': 'application/json'
    });

    this.http.post(url, curso, { headers }).pipe(
      catchError((error) => {
        console.error('Error al enviar el curso:', error);
        return of(null);  // Devuelve null en caso de error
      })
    ).subscribe((response) => {
      if (response) {
        console.log('Respuesta de la API:', response);
      } else {
        console.log('No se pudo enviar el curso.');
      }
    });
  }

  logout() {
    localStorage.removeItem('ingresado');
    this.router.navigate(['/']); 
  }
}
