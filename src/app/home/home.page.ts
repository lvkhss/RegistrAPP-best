import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  goToRecuperar() {
    console.log('click');

    this.router.navigate(['/recuperar'])
  }

  goToLink(url: string) {
    this.router.navigate([`/${url}`])
    // this.router.navigate(['/' + url])
  }


  goToPage(){
    this.router.navigate(['/principal'], {queryParams: {nombre: 'Elias'}})
  }
}
