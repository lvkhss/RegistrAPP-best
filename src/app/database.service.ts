import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'https://presenteprofe.cl/api/v1';  // Base URL de tu API

  constructor(private http: HttpClient) {}

  // Método para hacer login
  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    const payload = { username, password };
    return this.http.post(url, payload);
  }

  // Método para obtener datos (ejemplo: obtener perfil de usuario)
  getUserProfile(token: string): Observable<any> {
    const url = `${this.apiUrl}/user/me`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Token para autenticación
    });
    return this.http.get(url, { headers });
  }

  // Método para registrar un nuevo usuario
  registerUser(username: string, password: string, email: string): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;
    const payload = { username, password, email };
    return this.http.post(url, payload);
  }
}
