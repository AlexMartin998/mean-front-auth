import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  AuthStatus,
  LoginResponse,
  RenewTokenResponse,
  User,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  // // Signal: _ no significa nada mas q en JS q es private, pero en TS ya tiene private
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // dar acceso al mundo exterior con ComputedSignals (signals de SOLO LECTURA) para q NADIE fuera del service pueda cambiar el value de los Signals
  // los    SIGNALS   se INVOCAN con el parentesis ()
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    // apenas se cargue se verifique el status
    this.checkAuthStatus().subscribe();
  }

  // // methods
  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      // // si todo salio bien
      map(({ user, token }) => this.setAuthentication(user, token)),

      // // errors
      // catchError no nos da flexibilidad, deberia retornar el boolean, pero con el throwError puedo hacer mas cosas  <-- ver impl en el .subscribe()
      // atrapo y envio el message error del back
      catchError((error) => throwError(() => error.error.message))
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew-token`;
    const token = localStorage.getItem('token');
    if (!token) {
      // this._authStatus.set(AuthStatus.notAuthenticated);
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<RenewTokenResponse>(url, { headers }).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);

        return of(false);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
    this._authStatus.set(AuthStatus.notAuthenticated);
    this._currentUser.set(null);
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);

    localStorage.setItem('token', token);

    return true;
  }
}
