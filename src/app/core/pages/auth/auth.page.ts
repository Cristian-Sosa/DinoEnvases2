import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ToastService } from 'src/app/shared';
import { ISelect, IToast, IUsuario } from 'src/app/shared/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.sass'],
})
export class AuthPage {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router)

  public selectContent: ISelect = {
    name: 'sucursalName',
    options: [
      { value: 'AV', description: 'Alto Verde' },
      { value: 'R20', description: 'Ruta 20' },
      { value: 'SV', description: 'San Vicente' },
      { value: 'SAL', description: 'Salsipuedes' },
    ],
  };

  authForm = new FormGroup({
    userControl: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    passControl: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    sucursalControl: new FormControl(this.selectContent.options[0].value, [
      Validators.required,
      Validators.nullValidator,
    ]),
  });

  submitForm = () => {
    let usuario: IUsuario = {
      Usuario: this.authForm.get('userControl')?.value!,
      Password: this.authForm.get('passControl')?.value!,
      Sucursal: this.authForm.get('sucursalControl')?.value!,
    };

    let isUserRegistered: boolean = this.authService.userValidation(usuario);

    if (isUserRegistered) {
      let toast: IToast = {
        text: 'Se está validando al conexión',
        show: false,
      };

      this.router.navigate(['carga'])

      this.toastService.setToastState(toast);
    } else {
      let toast: IToast = {
        text: 'El usuario no existe',
        show: true,
      };
      
      this.toastService.setToastState(toast);
    }
  };
}
