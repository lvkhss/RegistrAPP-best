import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  username: string = "";
  menuOpen: boolean = false;
  selectedClass: string = '';
  qrCodeData: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invitado';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  seleccionarClase(clase: string) {
    this.selectedClass = clase;
    this.qrCodeData = `Asistencia para la clase de ${clase}`;
    this.menuOpen = false; 

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invitado';

  }
}