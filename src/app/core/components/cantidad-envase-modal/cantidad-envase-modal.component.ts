import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService, IToast, ISelect } from 'src/app/shared';

@Component({
  selector: 'app-cantidad-envase-modal',
  templateUrl: './cantidad-envase-modal.component.html',
  styleUrls: ['./cantidad-envase-modal.component.sass'],
})
export class CantidadEnvaseModalComponent {
  private location = inject(Location);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  public isCajonDisabled: boolean = false;

  public colorContent: ISelect = {
    name: 'color',
    options: [
      { value: 'verde', description: 'Verde' },
      { value: 'marron', description: 'Marrón' },
    ],
  };

  tipoEnvaseForm = new FormGroup({
    colorControl: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    cantidadControl: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
      Validators.min(1),
      Validators.max(5000),
    ]),
  });

  returnProcess = (): void => this.location.back();

  changeDisabled = (): void => {
    let envase: string | null | undefined =
      this.tipoEnvaseForm.get('envaseControl')?.value;

    envase! == 'drago'
      ? (this.isCajonDisabled = true)
      : (this.isCajonDisabled = false);
  };

  forwardProcess = (): void => {
    let cantidad: string | null | undefined =
      this.tipoEnvaseForm.get('cantidadControl')?.value;

    if (!cantidad) {
      let toast: IToast = {
        text: 'Cantidad inválida',
        show: true,
      };

      this.toastService.setToastState(toast);

      setTimeout(
        () => ((toast.show = false), this.toastService.setToastState(toast)),
        3000
      );
    } else {
      // this.router.navigate(['..', 'URL_CAJON'])
    }
  };
}
