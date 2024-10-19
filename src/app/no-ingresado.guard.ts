import { CanActivateFn, Router } from '@angular/router';

export const noIngresadoGuard: CanActivateFn = (route, state) => {
  const allowedRoutes = ['/home', '/register', '/recuperar'];
  const isIngresado = localStorage.getItem('ingresado') === 'true';

  if (isIngresado) {
    return true;
  } else {
    return allowedRoutes.includes(state.url);
  }
};