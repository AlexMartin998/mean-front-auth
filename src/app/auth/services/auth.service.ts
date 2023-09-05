import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthStatus, LoginResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  // // Signal: _ no significa nada mas q en JS q es private, pero en TS ya tiene private
  private _currentUser = signal<LoginResponse['user'] | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // dar acceso al mundo exterior con ComputedSignals (signals de SOLO LECTURA) para q NADIE fuera del service pueda cambiar el value de los Signals
  public currentUser = computed(() => this._currentUser);
  public authStatus = computed(() => this._authStatus);

  // // methods
  login(email: string, password: string): Observable<boolean> {
    return of(true);
  }
}
