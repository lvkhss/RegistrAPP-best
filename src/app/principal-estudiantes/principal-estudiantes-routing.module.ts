import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalEstudiantesPage } from './principal-estudiantes.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalEstudiantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalEstudiantesPageRoutingModule {}
