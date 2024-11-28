import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { noIngresadoGuard } from './no-ingresado.guard';
import { ingresadoGuard } from './ingresado.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [noIngresadoGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then(m => m.RecuperarPageModule),
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'principal-estudiantes',
    loadChildren: () => import('./principal-estudiantes/principal-estudiantes.module').then(m => m.PrincipalEstudiantesPageModule),
  },  {
    path: 'clases',
    loadChildren: () => import('./clases/clases.module').then( m => m.ClasesPageModule)
  },
  {
    path: 'crear-clases',
    loadChildren: () => import('./crear-clases/crear-clases.module').then( m => m.CrearClasesPageModule)
  },
  {
    path: 'detalle-clases',
    loadChildren: () => import('./detalle-clases/detalle-clases.module').then( m => m.DetalleClasesPageModule)
  },
  {
    path: 'clases-profesor',
    loadChildren: () => import('./clases-profesor/clases-profesor.module').then( m => m.ClasesProfesorPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }