import { ComponentFixture, TestBed } from '@angular/core/testing';
// Remove the import statement for 'RegisterPage' no es necesario ahora
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
class RegisterPage {
  username: string = '';
  password: string = '';

  constructor(private navCtrl: NavController) {}

  register() {
    // aqui se guardan los datos, ESTA ES LA MANERA MAS FACILL :()
    const user = {
      username: this.username,
      password: this.password
    };

    // GUARDAS MANERA LOCAL (A ULTIMA HORA)
    localStorage.setItem('user', JSON.stringify(user));

    // BACK TO THE LOGIN X
    this.navCtrl.navigateForward('/login');
  }
}