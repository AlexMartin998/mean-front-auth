import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStatus } from './auth/interfaces';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // para cunado hace refresh/reload
  public finishedAuthChecking = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) return false;

    // ya termino de verificar / checking
    return true;
  });

  // pendiente de los cambios del authStatus, tanto al cambiar como tal como al refresh page
  public authStatusChengedEffect = effect(() => {
    // se dispera siempre la 1ra vez, luego con c/cambio en el Signal
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        return this.router.navigateByUrl('/dashboard');

      case AuthStatus.notAuthenticated:
        return this.router.navigateByUrl('/auth/login');

      default:
        break;
    }

    return;
  });
}
