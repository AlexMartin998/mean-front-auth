import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),

    // guards
    canActivate: [isNotAuthenticatedGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),

    // guards Secured Routes
    canActivate: [isAuthenticatedGuard],
  },

  // { path: '404', component: Error404PageComponent },

  { path: '**', redirectTo: '404' },
];

@NgModule({
  // just for "prod" free tier
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
