import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  nombre: string = "";
  menuOpen: boolean = false;
  selectedClass: string = '';
  qrCodeData: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.nombre = params['nombre'] || 'Invitado';
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  seleccionarClase(clase: string) {
    this.selectedClass = clase;
    this.qrCodeData = `Asistencia para la clase de ${clase}`;
    this.menuOpen = false; // Cierra el menú después de seleccionar una clase
  }
}
