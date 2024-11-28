import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleClasesPageRoutingModule } from './detalle-clases-routing.module';

import { DetalleClasesPage } from './detalle-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleClasesPageRoutingModule
  ],
  declarations: [DetalleClasesPage]
})
export class DetalleClasesPageModule {}
