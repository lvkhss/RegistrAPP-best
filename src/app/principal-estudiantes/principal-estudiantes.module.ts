import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalEstudiantesPageRoutingModule } from './principal-estudiantes-routing.module';

import { PrincipalEstudiantesPage } from './principal-estudiantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalEstudiantesPageRoutingModule
  ],
  declarations: [PrincipalEstudiantesPage]
})
export class PrincipalEstudiantesPageModule {}
