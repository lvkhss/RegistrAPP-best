import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences'; // Cambiado a Preferences
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1/auth';

  constructor(private http: HttpClient) {}


  authenticate(credentials: { correo: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }


  async saveToken(token: string) {
    await Preferences.set({
      key: 'auth_token',
      value: token,
    });
  }


  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'auth_token' });
    return value;
  }


  async clearToken() {
    await Preferences.remove({ key: 'auth_token' });
  }
}