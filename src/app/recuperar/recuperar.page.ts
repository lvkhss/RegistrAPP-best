import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  username: string = '';
  newPassword: string = '';

  constructor(private navCtrl: NavController) {}

  updatePassword() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (this.username === storedUser.username) {
      storedUser.password = this.newPassword;
      localStorage.setItem('user', JSON.stringify(storedUser));
      console.log('Password updated successfully');
      this.navCtrl.navigateRoot('/home');
    } else {
      console.log('Username not found');
      // Optionally, show an alert or message to the user
    }
  }
}