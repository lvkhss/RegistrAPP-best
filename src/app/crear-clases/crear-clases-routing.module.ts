import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearClasesPage } from './crear-clases.page';

const routes: Routes = [
  {
    path: '',
    component: CrearClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearClasesPageRoutingModule {}
