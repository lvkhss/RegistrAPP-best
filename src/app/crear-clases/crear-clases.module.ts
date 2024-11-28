import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearClasesPageRoutingModule } from './crear-clases-routing.module';

import { CrearClasesPage } from './crear-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearClasesPageRoutingModule
  ],
  declarations: [CrearClasesPage]
})
export class CrearClasesPageModule {}
