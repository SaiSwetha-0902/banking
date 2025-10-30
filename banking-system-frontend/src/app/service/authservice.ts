import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Authservice {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}
 register(email: string, password: string): Observable<string> {
  return this.http.post(`${this.baseUrl}/register`, { email, password }, { responseType: 'text' });
}


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  storeToken(token: string) {
    localStorage.setItem('jwt', token);
  
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
  }
  
}
