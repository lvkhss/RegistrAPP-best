import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule } from '@angular/common/http'; 
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { NgxQRCodeModule } from 'ngx-qrcode2'; // Importa NgxQRCodeModule


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    QRCodeModule,
    HttpClientModule,
    // NgxQRCodeModule, // Añade NgxQRCodeModule a los imports
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,  // Agregar BarcodeScanner en los providers
  ],
  bootstrap: [AppComponent],
  schemas: [],
})
export class AppModule {}