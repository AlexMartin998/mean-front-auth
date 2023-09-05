import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  // // Inject by Attribute
  // nueva forma de Inyectar en Angular, ya NO por constructor. Con esto incluso de puede Inyectar Services en Functiones de TS
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  // // reactive form
  public myForm: FormGroup = this.fb.group({
    email: ['alex3@demo.com', [Validators.required, Validators.email]],
    password: ['123qWe123', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched();

    const { email, password } = this.myForm.value;

    // // dispara la req el .subscribe()
    this.authService.login(email, password).subscribe({
      next: () => console.log('todo ok'),
      error: (errorMessage: string) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
      },
    });
  }
}
