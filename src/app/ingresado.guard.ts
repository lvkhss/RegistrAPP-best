import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';
import { inject } from '@angular/core';

export const ingresadoGuard: CanActivateFn = (route, state) => {
  const navCtrl = inject(NavController);
  const isIngresado = localStorage.getItem('ingresado') === 'true';
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userType = user.userType;
  const restrictedRoutes = ['/home', '/register', '/recuperar'];

  if (isIngresado) {
    if (userType === 'Profesor') {
      if (state.url === '/principal-estudiantes') {
        navCtrl.navigateRoot('/principal');
        return false;
      }
      return true;
    }

    if (userType === 'Estudiante') {
      if (state.url === '/principal') {
        navCtrl.navigateRoot('/principal-estudiantes');
        return false;
      }
      return true;
    }

    navCtrl.navigateRoot('/home');
    return false;

  } else {
    if (restrictedRoutes.includes(state.url)) {
      return true;
    }
    navCtrl.navigateRoot('/home');
    return false;
  }
};