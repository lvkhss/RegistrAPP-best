import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesProfesorPage } from './clases-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesProfesorPageRoutingModule {}
