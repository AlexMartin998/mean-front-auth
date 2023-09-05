import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  // // Inject by Attribute
  // nueva forma de Inyectar en Angular, ya NO por constructor. Con esto incluso de puede Inyectar Services en Functiones de TS
  private fb = inject(FormBuilder);

  // // reactive form
  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched();

    console.log(this.myForm.value);
  }
}
