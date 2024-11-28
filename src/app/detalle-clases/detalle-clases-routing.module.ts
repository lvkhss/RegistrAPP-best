import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleClasesPage } from './detalle-clases.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleClasesPageRoutingModule {}
