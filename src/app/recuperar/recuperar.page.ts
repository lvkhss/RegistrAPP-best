import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  // variable user y password
  usuario: string = '';
  contra: string = '';

  constructor() { }

  ngOnInit() {
  }

}
