import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private env: any;

  constructor() {
    this.env = (window as any).__env || {};
  }

  getApiUrlAuth(): string {
    return this.env.API_URL_AUTH || '';
  }

  getApiUrlCursos(): string {
    return this.env.API_URL_CURSOS || '';
  }

  getApiUrlUsuarios(): string {
    return this.env.API_URL_USUARIOS || '';
  }

}