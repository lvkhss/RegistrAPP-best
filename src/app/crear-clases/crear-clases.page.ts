import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  //valores de formulario
  curso: any = {
    nombre: '',
    sigla: '',
    institucion: '',
    descripcion: ''
  };

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usuario = params['usuario'] ? params['usuario'] : 'Invitado';
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted', this.curso);
      this.postCurso(this.curso);
    }
  }
 
  postCurso(curso: any) {
    const url = 'https://www.presenteprofe.cl/api/v1/cursos'; 
    this.http.post(url, curso).pipe(
      catchError((error) => {
        console.error('Error al enviar el curso:', error);
        return of(null); // devuelve null porsiaca
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

