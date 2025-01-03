import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/login'; // URL de l'API de connexion
  private signupUrl = 'http://localhost:8080/signup'; // URL de l'API d'inscription
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(this.loginUrl, { username, password }).pipe(
        tap(response => {
          localStorage.setItem('authToken', response.token); // Stocker le jeton
          this.isAuthenticated = true;
        }),
        map(() => true),
        catchError(() => {
          this.isAuthenticated = false;
          return of(false);
        })
    );
  }

  signup(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(this.signupUrl, { username, password }).pipe(
        tap(response => {
          localStorage.setItem('authToken', response.token); // Stocker le jeton
          this.isAuthenticated = true;
        }),
        map(() => true),
        catchError(() => {
          this.isAuthenticated = false;
          return of(false);
        })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
  }
}
