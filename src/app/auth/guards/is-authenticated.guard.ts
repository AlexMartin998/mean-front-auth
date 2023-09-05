import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

// solo va a proteger la ruta dejando pasar el authenticated
export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  // inject allow us to inject in functions
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() !== AuthStatus.authenticated) {
    router.navigateByUrl('/auth/login');

    return false;
  }

  return true;
};
