import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  password: string = '';

  constructor(private navCtrl: NavController) {}

  register() {
    const user = {
      username: this.username,
      password: this.password
    };

    localStorage.setItem('user', JSON.stringify(user));
    this.navCtrl.navigateRoot('/home');
  }
}