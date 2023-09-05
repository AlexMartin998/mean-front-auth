import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

// protege las auth pages. Esto es importante para evitar q entre si esta Auth a traves de RouterLinks o retrocediendo, ya q al hacer Refresh de la Page, el   app.component.ts   en el SWITCH ya lo valida
export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  // inject allow us to inject in functions
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/dashboard');

    return false;
  }

  return true;
};
