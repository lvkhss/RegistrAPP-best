import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClasesService {
  private apiUrl = (window as any).__env.API_URL_CURSOS; // Variable de entorno

  constructor(private http: HttpClient) {}

  // Método para obtener todos los cursos
  getCursos(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.apiUrl, { headers });
  }

  // Método para crear un nuevo curso
  crearCurso(cursoData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, cursoData, { headers });
  }

  getClases(cursoId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/${cursoId}/clase`, { headers });
  }

  crearClase(cursoId: number, claseData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/${cursoId}/clase`, claseData, { headers });
  }
}
