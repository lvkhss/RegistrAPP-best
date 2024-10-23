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
  userType: string = '';
  selectedUserType: string = '';

  constructor(private navCtrl: NavController) {}

  register() {
    if (!this.userType) {
      alert('Por favor, selecciona un tipo de usuario.');
      return;
    }

    const user = {
      username: this.username,
      password: this.password,
      userType: this.userType
    };

    localStorage.setItem('user', JSON.stringify(user));
    
    if (this.userType === 'Profesor') {
      this.navCtrl.navigateRoot('/principal');
    } else if (this.userType === 'estudiante') {
      this.navCtrl.navigateRoot('/principal-estudiantes');
    }
  }

  selectUserType(type: string) {
    this.userType = type;
    this.selectedUserType = type;
  }
}