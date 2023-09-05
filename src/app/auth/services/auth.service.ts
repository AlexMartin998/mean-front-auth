import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  // // Signal: _ no significa nada mas q en JS q es private, pero en TS ya tiene private
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // dar acceso al mundo exterior con ComputedSignals (signals de SOLO LECTURA) para q NADIE fuera del service pueda cambiar el value de los Signals
  // los    SIGNALS   se INVOCAN con el parentesis ()
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  // // methods
  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      // // si todo salio bien
      tap(({ user, token }) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);

        localStorage.setItem('token', token);
      }),
      map(() => true),

      // // errors
      // catchError no nos da flexibilidad, deberia retornar el boolean, pero con el throwError puedo hacer mas cosas  <-- ver impl en el .subscribe()
      // atrapo y envio el message error del back
      catchError((error) => throwError(() => error.error.message))
    );
  }
}
