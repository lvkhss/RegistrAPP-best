import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  usuario: string = '';

  constructor(private router: Router) {}

  goToLogin() {
    console.log('click');

    this.router.navigate(['/home'])
  }

  goToLink(url: string) {
    this.router.navigate([`/${url}`])
    // this.router.navigate(['/' + url])
  }


  goToPage(){
    this.router.navigate(['/principal'], {queryParams: {nombre: this.usuario}})
  }
}
