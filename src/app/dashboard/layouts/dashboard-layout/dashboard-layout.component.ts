import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styles: [],
})
export class DashboardLayoutComponent {
  private readonly authService = inject(AuthService);

  // como es 1 Signal se lo debe invocar ()
  public user = this.authService.currentUser();

  // // noob way :v
  // get user() {
  //   return this.authService.currentUser();
  // }
}
