import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PresenteprofeService {
  private apiURL = 'https://www.presenteprofe.cl/api/v1';

  constructor(private http: HttpClient) {}

  // Método de login
  login(username: string, password: string): Observable<any> {
    const url = `${this.apiURL}/auth`;
    const payload = { correo: username, password: password };
    return this.http.post(url, payload);
  }

  // Método para obtener detalles del usuario (si es necesario)
  getUserDetails(username: string): Observable<any> {
    const url = `${this.apiURL}/auth/me?user=${username}`;
    return this.http.get(url);
  }
}
