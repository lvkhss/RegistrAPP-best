import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QRCodeModule } from 'angularx-qrcode'; // Importa QRCodeModule correctamente
import { QrScannerService } from './services/qr-scanner.service'; // Ruta correcta a tu servicio
import { NgxQRCodeModule } from 'ngx-qrcode2';


// Función para inicializar el servicio QrScannerService
export function initQrScannerService(qrScannerService: QrScannerService) {
  return () => qrScannerService.init();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    QRCodeModule, // Asegúrate de haber instalado correctamente este módulo
    HttpClientModule,
    NgxQRCodeModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner, // Agrega BarcodeScanner aquí
    QrScannerService, // Registra el servicio QrScannerService
    {
      provide: APP_INITIALIZER,
      useFactory: initQrScannerService,
      deps: [QrScannerService],
      multi: true, // Permite múltiples inicializadores
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
